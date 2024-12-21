import { defineStore } from 'pinia';
import { http } from '../lib/http';
import { useToast } from 'vue-toastification';
import { AxiosError } from 'axios';
import { ErrorData } from '../types/http';
import { reactive, ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
    let message = reactive([])
    let users = reactive([])
    const selectedUser = ref(false)
    const isUsersLoading = ref(false)
    const isMessagesLoading = ref(false)

    const getUsers = async () => {
        const toast = useToast();
        isUsersLoading.value = true
        try {
            const res = await http.get("/message/users")
            users = res.data
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
            const res = await http.get(`/message/${userId}`)
            message = res.data
        } catch (error) {
            const axiosError = error as ErrorData;
            toast.error(axiosError.response!.data.message);
        } finally {
            isMessagesLoading.value = false
        }
    }

    return {
        message,
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        getUsers,
        getMessage
    }
})
