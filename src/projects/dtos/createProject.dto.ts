import { IsArray, IsString } from "class-validator";

export class CreateProjectDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    gitHubLink: string; 
      
    @IsArray()
    techs: Array<string>; 
    
    @IsArray()
    images: Array<string>; 
    
}   