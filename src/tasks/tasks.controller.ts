import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { title } from 'process';
import { CreateTastDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Get("/:id")
    getTaskById(@Param("id") id: string): Task{
        return this.taskService.getTaskById(id);
    }

    // @Post()
    // createTask(@Body() body): Task{
    //     return this.taskService.createTask(body.title, body.description);
    // }

    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ): Task{
    //     return this.taskService.createTask(title, description);
    // }

    @Post()
    createTask(@Body() createTastDTO: CreateTastDTO): Task{
        return this.taskService.createTask(createTastDTO);
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string){
        return this.taskService.deleteTask(id);
    }
}
