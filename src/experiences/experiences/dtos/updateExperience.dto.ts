import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateExperienceDto {
    @IsOptional()
    @IsString()
    dates?: string;

    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsString()
    company?: string; 
    
    @IsOptional()
    @IsString()
    description?: string; 
    
    @IsOptional()  
    @IsArray()
    techs?: Array<string>;  
    
}   