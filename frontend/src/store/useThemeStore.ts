import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    // 定义状态
    const theme = ref<string>(localStorage.getItem('chat-theme') || 'coffee');

    // 定义 actions
    const setTheme = (newTheme: string) => {
        theme.value = newTheme;
        localStorage.setItem('chat-theme', newTheme);
    };

    // 返回状态和 actions
    return { theme, setTheme };
});