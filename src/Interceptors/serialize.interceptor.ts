import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassType } from 'src/types/class-type.interface';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {

  constructor(
    private dto: ClassType
  ){}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    return handler.handle().pipe(map((data) => {
      return plainToClass(this.dto,data,{
        excludeExtraneousValues: true,
      })
    }));
  }
}
