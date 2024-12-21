// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/useAuthStore';

// 导入你的组件
import Home from '../page/HomePage/index.vue'
import Login from '../page/LoginPage/index.vue'
import SignUp from '../page/SignUpPage/index.vue'
import Profile from '../page/ProfilePage/index.vue'
import Settings from '../page/SettingsPage/index.vue'

// 定义路由
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: { requiresAuth: true },
    },
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 History 模式
    routes
})

router.beforeEach(async (to, from, next) => {
    // 从 store 中获取状态
    const authStore = useAuthStore();
    const { authUser, isCheckingAuth } = storeToRefs(authStore);

    // 检查目标路由是否需要权限
    if (to.meta.requiresAuth) {
        // 如果正在检查认证状态，等待检查完成
        if (isCheckingAuth.value) {
            await new Promise(resolve => {
                const unwatch = authStore.$subscribe(() => {
                    if (!isCheckingAuth.value) {
                        unwatch();
                        resolve(true);
                    }
                });
            });
        }

        // 如果 authUser 为 null，重定向到登录页
        if (!authUser.value) {
            next({ name: 'Login' });
        } else {
            next(); // 允许访问
        }
    } else {
        next(); // 不需要权限的路由，直接访问
    }
});

export default router