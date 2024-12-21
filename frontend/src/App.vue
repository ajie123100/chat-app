<template>
  <div class="min-h-screen bg-gray-100" :data-theme="theme">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main :data-theme="theme">
      <router-view />
    </main>



    <!-- Loading Spinner -->
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Loader class="size-10 animate-spin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useThemeStore } from './store/useThemeStore';

// 从 store 中获取状态
const authStore = useAuthStore();
const themeStore = useThemeStore()
const { authUser, isCheckingAuth } = storeToRefs(authStore); // 保持响应式
const { theme } = storeToRefs(themeStore)
const { checkAuth } = authStore; // 方法不需要响应式

// 在组件挂载时调用 checkAuth
onMounted(() => {
  checkAuth();
});

// 加载状态
const isLoading = computed(() => {
  return isCheckingAuth.value && !authUser.value
});

</script>