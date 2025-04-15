import { IsOptional, IsString } from "class-validator";

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
    techs?: Array<string>;  
    
    @IsOptional()  
    @IsString()
    images?: Array<string>;
    
}   