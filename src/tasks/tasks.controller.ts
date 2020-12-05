import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { title } from 'process';
import { CreateTastDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { log } from 'console';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getAllTasks(@Query() filterDTO: GetTaskFilterDTO): Task[] {

        if(Object.keys(filterDTO).length > 0){
            return this.taskService.getTaskWithFilters(filterDTO);
        }
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

    @Patch("/:id/status")
    updateStatus(@Param("id") id: string, @Body("status")status: TaskStatus): Task{
        return this.taskService.updateTaskStatus(id, status);
    }
}
