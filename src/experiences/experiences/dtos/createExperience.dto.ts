import { IsArray, IsString } from "class-validator";

export class CreateExperienceDto {

    @IsString()
    dates: string;

    @IsString()
    position: string;

    @IsString()
    company: string; 
    
    @IsString()
    description: string; 
      
    @IsArray()
    techs: Array<string>;  
}   