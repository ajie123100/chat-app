<template>
    <div class="h-screen pt-20">
        <div class="max-w-2xl mx-auto p-4 py-8">
            <div class="bg-base-300 rounded-xl p-6 space-y-8">
                <div class="text-center">
                    <h1 class="text-2xl font-semibold ">Profile</h1>
                    <p class="mt-2">Your profile information</p>
                </div>

                <!-- avatar upload section -->
                <div class="flex flex-col items-center gap-4">
                    <div class="relative">
                        <img :src="selectedImg || authUser?.profilePic || '/avatar.png'" alt="Profile"
                            class="size-32 rounded-full object-cover border-4">
                        <label htmlFor="avatar-upload" class="absolute bottom-0 right-0 bg-base-content
                             hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
                            :class="isUpdatingProfile ? ' animate-pulse pointer-events-none' : ''">

                            <Camera class="w-5 h-5 text-base-200" />
                            <input id="avatar-upload" type="file" class="hidden" accept="image/*"
                                @change="handleImageUpload" :disabled="isUpdatingProfile">
                        </label>
                    </div>
                    <p className="text-sm text-zinc-400">
                        {{ isUpdatingProfile ? "Uploading..." : "click the camera icon to update your photo" }}
                    </p>
                </div>

                <div class="space-y-6">
                    <div class="space-y-1.5">
                        <div class="text-sm text-zinc-400 flex items-center gap-2">
                            <User class="w-4 h-4" />
                            Full Name
                        </div>
                        <p class="px-4 py-2.5 bg-base-200 rounded-lg border">{{ authUser?.fullName }}</p>
                    </div>
                    <div class="space-y-1.5">
                        <div class="text-sm text-zinc-400 flex items-center gap-2">
                            <Mail class="w-4 h-4" />
                            Email Address
                        </div>
                        <p class="px-4 py-2.5 bg-base-200 rounded-lg border">{{ authUser?.email }}</p>
                    </div>
                </div>

                <div class="mt-6 bg-base-300 rounded-xl p-6">
                    <h2 class="text-lg font-medium mb-4">Account Information</h2>
                    <div class="space-y-3 text-sm">
                        <div class="flex items-center justify-between py-2 border-b border-zinc-700">
                            <span>Member Since</span>
                            <span>{{ authUser?.createdAt?.split("T")[0] }}</span>
                        </div>
                        <div class="flex items-center justify-between py-2">
                            <span>Account Status</span>
                            <span class="text-green-500">Active</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-vue-next';
import { ref } from 'vue';
defineOptions({
    name: 'Profile'
})
const authStore = useAuthStore()
const { authUser, isUpdatingProfile } = storeToRefs(authStore)
const { updateProfile } = authStore

const selectedImg = ref<string | ArrayBuffer | null>(null)
const setSelectedImg = ref()

const handleImageUpload = async (e: Event) => {
    const file = (e.target as HTMLInputElement)?.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = async () => {
        const base64Image = reader.result
        selectedImg.value = base64Image
        await updateProfile({ profilePic: base64Image })
    }
}
</script>

<style scoped></style>