<template>
    <header class="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
        <div class=" container mx-auto px-4 h-16">
            <div class="flex items-center justify-between h-full">
                <div class="flex items-center gap-8">
                    <router-link to="/" class="flex items-center gap-2.5 hover:opacity-80 transition-all">
                        <div class="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MessageSquare class="w-5 h-5 text-primary" />
                        </div>
                        <h1 class="text-lg font-bold">chatty</h1>
                    </router-link>
                </div>

                <div class="flex items-center gap-2">
                    <router-link to="/settings" class="btn btn-sm gap-2 transition-colors">
                        <Settings class="w-4 h-4" />
                        <span class="hidden sm:inline">Settings</span>
                    </router-link>
                    <template v-if="authUser">
                        <router-link to="/profile" class="btn btn-sm gap-">
                            <User class="size-5" />
                            <span class="hidden sm:inline">Profile</span>
                        </router-link>
                        <button class="flex gap-2 items-center" @click="logout">
                            <LogOut class="size-5" />
                            <span class="hidden sm:inline">Logout</span>
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Settings, User, LogOut } from 'lucide-vue-next';

defineOptions({
    name: 'Navbar'
})
const authStore = useAuthStore()
const { authUser } = storeToRefs(authStore)
const { logout } = authStore;
</script>
