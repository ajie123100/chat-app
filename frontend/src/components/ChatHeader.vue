<template>
    <div class="p-2.5 border-b border-base-300">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <!-- Avatar -->
                <div class="avatar">
                    <div class="size-10 rounded-full relative">
                        <img :src="selectedUser?.profilePic || '/avatar.png'" :alt="selectedUser?.fullName" />
                    </div>
                </div>
                <!-- User Info -->
                <div>
                    <h3 class=" font-medium">{{ selectedUser?.fullName }}</h3>
                    <p class="text-sm text-base-content/70">{{ onlineUsers.includes(selectedUser!._id) ? 'Online' :
                        'Offline' }}</p>
                </div>
            </div>
            <!-- Close button -->
            <button @click="setSelectedUser(null);">
                <X />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { X } from 'lucide-vue-next';

defineOptions({
    name: 'ChatHeader'
})
const authStore = useAuthStore()
const chatStore = useChatStore()
const { onlineUsers } = storeToRefs(authStore)
const { selectedUser } = storeToRefs(chatStore)
const { setSelectedUser } = chatStore

</script>

<style scoped></style>