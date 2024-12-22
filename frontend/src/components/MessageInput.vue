<template>
    <div class="p-4 w-full">
        <div v-if="imagePreview" class="mb-3 flex items-center gap-2">
            <div class="relative">
                <img :src="imagePreview" alt="Preview"
                    class=" w-20 h-20 object-cover rounded-lg border border-zinc-700" />
                <button @click="removeImage" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
flex items-center justify-center" type="button">
                    <X class="size-3" />
                </button>
            </div>
        </div>

        <form @submit="handleSendMessage" class="flex items-center gap-2">
            <div class="flex-1 flex gap-2">
                <input type="text" class="w-full input input-bordered rounded-lg input-sm sm:input-md"
                    placeholder="Type a message.." v-model="text" />
                <input type="file" accept="image/*" class="hidden" ref="fileInputRef" @change="handleImageChange" />
                <button type="button" class="hidden sm:flex btn btn-circle"
                    :class="imagePreview ? 'text-emerald-500' : 'text-zinc-400'" @click="$refs.fileInputRef?.click()">
                    <Image :size="20" />
                </button>
            </div>
            <button type="submit" class="btn btn-sm btn-circle" :disabled="!text.trim() && !imagePreview">
                <Send :size="20" />
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChatStore } from '../store/useChatStore';
import { X, Image, Send } from 'lucide-vue-next';

defineOptions({
    name: 'MessageInput'
})
const text = ref('');

const imagePreview = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const chatStore = useChatStore();
const { sendMessage } = chatStore
const handleImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string;
        }
        reader.readAsDataURL(file);
    }
}
const removeImage = () => {
    imagePreview.value = null;
    if (fileInputRef.value) {
        fileInputRef.value.value = '';
    }
}
const handleSendMessage = async (e: Event) => {
    e.preventDefault();
    if (text.value.trim() || imagePreview.value) {
        sendMessage({
            text: text.value.trim(),
            image: imagePreview.value
        });
        text.value = '';
        removeImage()
    }
}
</script>

<style scoped></style>