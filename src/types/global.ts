export type TError = {
    status: number;
    data: {
        message: string;
        stack: string;
        success: boolean;
    }
};

export type TResponse<T> = {
    error?: TError;
    data: T;
    success: boolean;
    message: string;
}