
export interface IResponseService<T> {
    success: boolean;
    message: string;
    entity?: T;
}
