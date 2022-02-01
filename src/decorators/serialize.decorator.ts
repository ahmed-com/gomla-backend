import { UseInterceptors } from "@nestjs/common";
import { SerializeInterceptor } from "src/Interceptors/serialize.interceptor";
import { ClassType } from "src/types/class-type.interface";

export function Serialize(dto: ClassType) {
    return UseInterceptors(new SerializeInterceptor(dto))
}