<template>
    <SidebarSkeletons v-if="isUsersLoading" />
    <aside v-else class="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <!-- Header -->
        <div class="border-b border-base-300 w-full p-5">
            <div class="flex items-center gap-2">
                <Users class="w-6 h-6" />
                <span class="font-medium hidden lg:block">Contacts</span>
            </div>
            <!-- TODO: Online filter toggle -->

            <div className="mt-3 hidden lg:flex items-center gap-2">
                <label className="cursor-pointer flex items-center gap-2">
                    <input type="checkbox" v-model="showOnlineOnly" className="checkbox checkbox-sm" />
                    <span className="text-sm">Show online only</span>
                </label>
                <span className="text-xs text-zinc-500">{{ onlineUsers.length - 1 }} online</span>
            </div>

        </div>
        <div class="overflow-y-auto w-full py-3">
            <button v-for="user in filterUsers" :key="user._id" @click="setSelectedUser(user)"
                class="w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors"
                :class="{ 'bg-base-300 ring-1 ring-base-300': selectedUser && selectedUser._id === user._id }">

                <div class="relative mx-auto lg:mx-0">
                    <img :src="user.profilePic || '/avatar.png'" :alt="user.fullName"
                        class="size-12 object-cover rounded-full" />
                    <span v-if="onlineUsers && onlineUsers.includes(user._id)"
                        class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900">
                    </span>
                </div>

                <div class="hidden lg:block text-left min-w-0">
                    <div class="font-medium truncate">{{ user.fullName }}</div>
                    <div class="text-sm text-zinc-400">
                        {{ onlineUsers.includes(user._id) ? "online" : "offline" }}
                    </div>
                </div>
            </button>
            <div v-if="filterUsers.length === 0" class="text-center text-zinc-500 py-4">No online users</div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useChatStore } from '../store/useChatStore';
import { computed, onMounted, ref } from 'vue';
import SidebarSkeletons from './skeletons/SidebarSkeletons.vue';
import { Users } from 'lucide-vue-next';
import { useAuthStore } from '../store/useAuthStore';

defineOptions({
    name: 'Sidebar'
})
const chatStore = useChatStore()
const authSotre = useAuthStore()
const { users, selectedUser, isUsersLoading } = storeToRefs(chatStore)
const { onlineUsers } = storeToRefs(authSotre)
const { getUsers, setSelectedUser } = chatStore

const showOnlineOnly = ref(false)

const filterUsers = computed(() => {
    if (showOnlineOnly.value) {
        return users.value.filter(user => onlineUsers.value.includes(user._id))
    }
    return users.value
})

onMounted(() => {
    getUsers()
})

</script>

<style scoped></style>