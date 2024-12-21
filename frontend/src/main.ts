import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import './assets/tailwind.css'; // 引入 Tailwind CSS
import Toast, { PluginOptions, POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // 引入默认样式
import router from './router' // 导入路由配置
import pinia from './store'; // 导入 Pinia 实例

const app = createApp(App)

// 配置选项（可选）
const options: PluginOptions = {
    position: POSITION.TOP_CENTER, // 默认位置
    timeout: 5000, // 默认显示时间（5秒）
    closeOnClick: true, // 点击关闭
    pauseOnFocusLoss: true, // 失去焦点时暂停计时
    pauseOnHover: true, // 鼠标悬停时暂停计时
    draggable: true, // 可拖动
    draggablePercent: 0.6, // 拖动关闭的百分比
    showCloseButtonOnHover: false, // 鼠标悬停时显示关闭按钮
    hideProgressBar: false, // 隐藏进度条
    closeButton: 'button', // 关闭按钮类型
    icon: true, // 显示图标
    rtl: false, // 从右到左布局
};

app.use(Toast, options);

app.use(router)
app.use(pinia);
app.mount('#app')
