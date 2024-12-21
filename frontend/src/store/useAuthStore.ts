import { defineStore } from 'pinia';
import { http } from '../lib/http';
import { LoginProps, SignupProps, UpdateProfileProps } from '../types/auth';
import { useToast } from 'vue-toastification';
import { AxiosError } from 'axios';
import { ErrorData } from '../types/http';
import router from '../router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null as null | Record<string, any>,
        isSigningUp: false as boolean,
        isLogginIng: false as boolean,
        isUpdatingProfile: false as boolean,

        isCheckingAuth: true as boolean,
    }),

    getters: {
    },

    actions: {
        async checkAuth() {
            try {
                const res = await http.get('/auth/check'); // 发送请求
                this.authUser = res.data;
            } catch (error) {
                console.error('Authentication check failed:', error);
                this.authUser = null; // 如果失败，重置 authUser
            } finally {
                this.isCheckingAuth = false
            }
        },
        async signup(data: SignupProps) {
            this.isSigningUp = true
            const toast = useToast();
            try {
                const res = await http.post("/auth/signup", data)
                this.authUser = res.data
                toast.success("Account created successfully")
            } catch (error) {
                // 断言 error 为 ErrorData
                const axiosError = error as ErrorData;
                toast.error(axiosError.response!.data.message);
            } finally {
                this.isSigningUp = false
            }
        },
        async logout() {
            this.isLogginIng = true
            const toast = useToast();
            try {
                await http.post("/auth/logout")
                this.authUser = null
                toast.success("Logged out successfully")
                // 登录成功 跳转到首页
                router.push("/")
            } catch (error) {
                // 断言 error 为 ErrorData
                const axiosError = error as ErrorData;
                toast.error(axiosError.response!.data.message);
            } finally {
                this.isLogginIng = false
            }
        },
        async login(data: LoginProps) {
            this.isLogginIng = true
            const toast = useToast();
            try {
                const res = await http.post("/auth/login", data)
                this.authUser = res.data
                toast.success("Logged in successfully")
            } catch (error) {
                const axiosError = error as ErrorData;
                toast.error(axiosError.response!.data.message);
            } finally {
                this.isLogginIng = false
            }
        },
        async updateProfile(data: UpdateProfileProps) {
            this.isUpdatingProfile = true
            const toast = useToast();
            try {
                const res = await http.put("/auth/update-profile", data)
                this.authUser = res.data
                toast.success("Profile updated successfully")
            } catch (error) {
                // 断言 error 为 ErrorData
                const axiosError = error as ErrorData;
                toast.error(axiosError.response!.data.message);
            } finally {
                this.isUpdatingProfile = false
            }
        }
    },
});