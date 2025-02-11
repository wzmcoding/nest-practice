/* eslint-disable prettier/prettier */
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface data<T = any> {
    data: T;
}

@Injectable()
export class Response<T = any> implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<data<T>> {
        return next.handle().pipe(
            map((data) => {
                return {
                    data,
                    status: 0,
                    success: true,
                    message: '牛逼',
                };
            }),
        );
    }
}
