import { defineStore, storeToRefs } from 'pinia';
import { http } from '../lib/http';
import { useToast } from 'vue-toastification';
import { ErrorData } from '../types/http';
import { reactive, ref } from 'vue';
import { UserProps } from '../types/User';
import { MessageProps } from '../types/Message';
import { useAuthStore } from './useAuthStore';

export const useChatStore = defineStore('chat', () => {
    const messages = ref<MessageProps[]>([])
    const users = reactive<UserProps[]>([])
    const selectedUser = ref<UserProps | null>(null);
    const isUsersLoading = ref(false)
    const isMessagesLoading = ref(false)

    const getUsers = async () => {
        const toast = useToast();
        isUsersLoading.value = true
        try {
            const res = await http.get("/messages/users")
            users.splice(0, users.length, ...res.data);
        } catch (error) {
            const axiosError = error as ErrorData;
            toast.error(axiosError.response!.data.message);
        } finally {
            isUsersLoading.value = false
        }
    }

    const getMessage = async (userId: string) => {
        const toast = useToast();
        isMessagesLoading.value = true
        try {
            const res = await http.get(`/messages/${userId}`)
            messages.value = res.data
        } catch (error) {
            const axiosError = error as ErrorData;
            toast.error(axiosError.response!.data.message);
        } finally {
            isMessagesLoading.value = false
        }
    }

    const setSelectedUser = (user: UserProps | null) => {
        selectedUser.value = user; // 更新响应式变量
    };

    const sendMessage = async (MessageData: { text?: string, image?: string | null }) => {
        const toast = useToast();
        try {
            const res = await http.post(`/messages/send/${selectedUser.value?._id}`, MessageData)
            messages.value.push(res.data)
        } catch (error) {
            const axiosError = error as ErrorData;
            toast.error(axiosError.response!.data.message);
        }
    }

    const subscribeToMessages = () => {
        if (!selectedUser.value) return
        const authStore = useAuthStore()
        const { socket } = storeToRefs(authStore)
        socket.value?.on("newMessage", (newMessage: MessageProps) => {
            
            if (newMessage.senderId !== selectedUser.value?._id) return
            messages.value = [...messages.value, newMessage]
        })
    }

    const unsubscribeToMessages = () => {
        const authStore = useAuthStore()
        const { socket } = storeToRefs(authStore)
        socket.value?.off("newMessage")
    }

    return {
        messages,
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        getUsers,
        getMessage,
        setSelectedUser,
        sendMessage,
        subscribeToMessages,
        unsubscribeToMessages
    }
})
