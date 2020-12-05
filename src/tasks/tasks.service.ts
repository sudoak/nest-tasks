import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTastDTO } from './dto/create-task.dto';
import { title } from 'process';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilters(filterDTO: GetTaskFilterDTO): Task[]{
        const { search, status} = filterDTO;
        let tasks = this.tasks;
        if(status){
            tasks = tasks.filter(task => task.status === status)
        }
        if(search){
            tasks = tasks.filter(task => task.description.includes(search) || task.title.includes(search));
        }
        return tasks;
    }
    getTaskById(id: string): Task {
        const _ =  this.tasks.find(task => id === task.id)
        if(!_){
            throw new NotFoundException("No Task Found");
        }
        return _;
    }

    deleteTask(id: string): void{
        const found: Task = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }
    createTask(createTastDTO: CreateTastDTO): Task{

        const { title, description} = createTastDTO;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task{
        const task: Task = this.getTaskById(id);
        this.deleteTask(id);
        task.status = status;
        this.tasks.concat(task);
        return task;
    }

}
