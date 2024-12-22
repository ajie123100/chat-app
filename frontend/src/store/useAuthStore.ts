import { defineStore } from 'pinia';
import { http } from '../lib/http';
import { LoginProps, SignupProps, UpdateProfileProps } from '../types/auth';
import { useToast } from 'vue-toastification';
import { AxiosError } from 'axios';
import { ErrorData } from '../types/http';
import router from '../router';
import { UserProps } from '../types/User';
import { io, Socket } from 'socket.io-client';

const BASE_URL = 'http://localhost:5001';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null as null | UserProps,
        isSigningUp: false as boolean,
        isLogginIng: false as boolean,
        isUpdatingProfile: false as boolean,
        onlineUsers: [] as string[],
        socket: null as null | Socket,

        isCheckingAuth: true as boolean,
    }),

    getters: {
    },

    actions: {
        async checkAuth() {
            try {
                const res = await http.get('/auth/check'); // 发送请求
                this.authUser = res.data;

                this.connectSocket()
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
                this.connectSocket()
                // 注册成功后，跳转到首页
                router.push("/")
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
                this.disconnectSocket()
                // 退出登录后，跳转到登录页面
                router.push("/login")
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
                this.connectSocket()
                // 登录成功后，跳转到首页
                router.push("/")
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
        },
        connectSocket() {
            if (!this.authUser || this.socket?.connected) return
            this.socket = io(BASE_URL, {
                query: {
                    userId: this.authUser._id
                }
            })
            this.socket.connect()

            this.socket.on('getOnlineUsers', (userIds: string[]) => {
                this.onlineUsers = userIds
            })
        },
        disconnectSocket() {
            if (this.socket?.connected) {
                this.socket.disconnect()
                this.socket = null
            }
        },
    },
});