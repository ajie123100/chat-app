<template>
    <div class="min-h-screen grid lg:grid-cols-2">
        <!-- left side -->
        <div class="flex flex-col justify-center items-center p-6 sm:p-12">
            <div class="w-full max-w-md space-y-8">
                <!-- LOGO -->
                <div class="text-center mb-8">
                    <div class="flex flex-col items-center gap-2 group">
                        <div
                            class="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <MessageSquare class="size-6 text-primary" />
                        </div>
                        <h1 class="text-2xl font-bold mt-2">Create Account</h1>
                        <p class="text-base-content/60">Get started with your free account</p>
                    </div>
                </div>

                <form @submit="handleSubmit" class="space-y-6">

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Full Name</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User class="size-5 text-base-content/40" />
                            </div>
                            <input type="text" class="input input-bordered w-full pl-10" v-model="formData.fullName"
                                placeholder="Enter your full name" />
                        </div>
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Email</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail class="size-5 text-base-content/40" />
                            </div>
                            <input type="email" class="input input-bordered w-full pl-10" v-model="formData.email"
                                placeholder="you@example.com" />
                        </div>
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">Password</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock class="size-5 text-base-content/40" />
                            </div>
                            <input :type="showPassword ? 'text' : 'password'" class="input input-bordered w-full pl-10"
                                v-model="formData.password" placeholder="●●●●●●●●" />
                            <button type="button" class=" absolute inset-y-0 right-0 pr-3 fle items-center"
                                @click="togglePasswordVisibility">
                                <EyeOff v-if="!showPassword" class="size-5 text-base-content/40" />
                                <Eye v-else class="size-5 text-base-content/40" />
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary w-full" :disabled="isSigningUp">
                        <template v-if="isSigningUp">
                            <Loader2 class="size-5 animate-spin" />
                            Loading...
                        </template>
                        <template v-else>
                            Create Account
                        </template>
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-base-content/6o">
                        Already have an account?
                        <router-link to="/login" className="link link-primary"> Sign in </router-link>
                    </p>
                </div>
            </div>
        </div>
        <!-- right side -->
        <AuthImagePattern title="Join our community"
            subtitle="Connect with friend, share moments, and stay in touch with your loved ones." />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../store/useAuthStore';
import { MessageSquare, User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import AuthImagePattern from '../../components/AuthImagePattern.vue';
import { useToast } from 'vue-toastification';
defineOptions({
    name: 'SignUp'
})
const toast = useToast();
const authStore = useAuthStore()
const { isSigningUp } = storeToRefs(authStore)
const { signup } = authStore

// 状态管理
const showPassword = ref(false);
const formData = reactive({
    fullName: '',
    email: '',
    password: '',
});

// 切换密码可见性
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};


const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required")
    if (!formData.email.trim()) return toast.error("Email is required")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format")
    if (!formData.password.trim()) return toast.error("Password is required")
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters")
    return true
}
const handleSubmit = (e: Event) => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) return signup(formData)
}
</script>

<style scoped></style>