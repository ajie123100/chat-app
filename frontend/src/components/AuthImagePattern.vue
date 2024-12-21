<template>
    <div class="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div class="max-w-md text-center">
            <div className="grid grid-cols-3 gap-3 mb-8">
                <div v-for="index in 9" :key="index" :class="{
                    'aspect-square': true, 'rounded-2xl': true, 'bg-primary/10': true, 'animate-pulse': index % 2 === 0
                }"></div>
            </div>
            <h2 className="text-2xl font-bold mb-4">{{ title }}</h2>
            <p className="text-base-content/60">{{ subtitle }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AuthImagePatternProps } from '../types/AuthImagePattern';

defineOptions({
    name: 'AuthImagePattern'
})
defineProps<AuthImagePatternProps>()
</script>

<style scoped></style>