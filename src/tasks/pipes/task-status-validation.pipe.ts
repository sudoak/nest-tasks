import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { log } from 'console';
import { TaskStatus } from '../tasks.model';
export class TaskStatusValidation implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata ){
        log(value, metadata);
        value = value.toUpperCase();
        if(Object.values(TaskStatus).includes(value)){
            return value;
        }
        throw new BadRequestException(`${value} is not valid status`)
    }
}