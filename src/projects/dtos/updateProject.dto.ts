import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    gitHubLink?: string; 
    
    @IsOptional()
    @IsString()
    appLink?: string; 
    
    @IsOptional()  
    @IsArray()
    techs?: Array<string>;  
    
    @IsOptional()  
    @IsArray()
    images?: Array<string>;
    
}   