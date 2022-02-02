import { UseInterceptors } from "@nestjs/common";
import { FetchUserInterceptor } from "src/auth/interceptors/fetch-user.interceptor";


export function FetchUser() {
    return UseInterceptors(FetchUserInterceptor);
}