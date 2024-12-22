<template>
    <div class="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
        <div class=" max-w-md text-center space-y-6">
            <!-- Icon Display -->
            <div class="flex justify-center gap-4 mb-4">
                <div class="relative">
                    <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                        <MessageSquare class="w-8 h-8 text-primary" />
                    </div>
                </div>
            </div>
            <!-- Welcome Text -->
            <h2 class="text-2xl font-bold">Welcome to Chatty!</h2>
            <p class="text-base-content/60">
                Select a conversation from the sidebar to start chatting
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MessageSquare } from 'lucide-vue-next';

defineOptions({
    name: 'NochatSelected'
})
</script>

<style scoped></style>