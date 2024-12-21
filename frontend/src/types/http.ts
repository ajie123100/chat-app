import { AxiosError, AxiosResponse } from "axios";

export interface ErrorData extends AxiosError {
    response?: ResponseError
}

export interface ResponseError extends AxiosResponse {
    data: { message: string, [key: string]: any }; // 错误消息
}