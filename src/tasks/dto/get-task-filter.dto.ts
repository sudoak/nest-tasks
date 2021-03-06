import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTaskFilterDTO {
    @IsOptional()
    @IsIn(Object.values(TaskStatus))
    status: TaskStatus
    @IsOptional()
    @IsNotEmpty()
    search: string
}