
export interface CustomResponse<T> {
    status: number;
    ok: boolean;
    data: T;
    error: string;
    page: number;
}