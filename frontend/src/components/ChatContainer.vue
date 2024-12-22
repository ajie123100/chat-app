<template>
    <div v-if="isMessagesLoading" class="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
    </div>
    <div v-else class="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div class="flex-1 overflow-y-scroll p-4 space-y-4">
            <div v-for="message in messages" :key="message._id" class="chat"
                :class="message.senderId === authUser?._id ? 'chat-end' : 'chat-start'">
                <!-- 消息内容 -->
                <div class="chat-image avatar">
                    <div class="size-10 rounded-full border">
                        <img :src="message.senderId === authUser?._id ? authUser?.profilePic || '/avatar.png' : selectedUser?.profilePic || '/avatar.png'"
                            :alt="message.senderId === authUser?._id ? authUser?.fullName : selectedUser?.fullName" />
                    </div>
                </div>
                <div class="chat-header mb-1">
                    <time class="text-xs opacity-50 ml-1">
                        {{ formatMessageTime(message.createdAt) }}
                    </time>
                </div>
                <div
                    :class="['chat-bubble', 'flex', 'flex-col', 'max-w-full', message.senderId === authUser?._id ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content']">
                    <img v-if="message.image" :src="message.image" alt="Attachment"
                        class="max-w-full max-h-64 object-cover rounded-md mb-2" />
                    <p v-if="message.text" class="break-words max-w-full">{{ message.text }}</p>
                </div>
            </div>
            <div ref="messageEndRef" /> <!-- 添加一个空的 div -->
        </div>
        <MessageInput />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, watchEffect, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader.vue';
import MessageSkeleton from './MessageSkeleton.vue';
import MessageInput from './MessageInput.vue';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils.ts';

const chatStore = useChatStore()
const authStore = useAuthStore()
const { messages, isMessagesLoading, selectedUser } = storeToRefs(chatStore)
const { authUser } = storeToRefs(authStore)
const { getMessage, subscribeToMessages, unsubscribeToMessages } = chatStore

const messageEndRef = ref<HTMLElement | null>(null);
const isScrolled = ref(false); // 标志位，用于标记是否已经滚动到底部

const scrollToBottom = () => {
    if (isScrolled.value) return; // 如果已经滚动过，直接返回
    isScrolled.value = true; // 标记为已滚动
    setTimeout(() => {
        if (messageEndRef.value && messages.value) {
            messageEndRef.value.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500); // 延迟 800ms
}

onMounted(async () => {
    const userId = selectedUser.value?._id;
    if (userId) {
        await getMessage(userId);
        await nextTick();
        scrollToBottom();
    }
});

onUnmounted(() => {
    unsubscribeToMessages();
});

watch(() => selectedUser.value, async (newUser) => {
    if (newUser) {
        await getMessage(newUser._id);
        await nextTick();
        isScrolled.value = false; // 重置标志位
        scrollToBottom();
    }
});

watch(() => messages.value.length, async () => {
    await nextTick();
    isScrolled.value = false; // 重置标志位
    scrollToBottom();
});

watchEffect((onCleanup) => {
    subscribeToMessages();
    onCleanup(() => {
        unsubscribeToMessages();
    });
}, { flush: 'post' });
</script>