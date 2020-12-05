import { IsNotEmpty } from "class-validator";

export class CreateTastDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}