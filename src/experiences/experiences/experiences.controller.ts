import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateExperienceDto } from './dtos/createExperience.dto';
import { UpdateExperienceDto } from './dtos/updateExperience.dto';

@Controller('experiences')
export class ExperiencesController {
    
      constructor(private readonly experiencesService: ExperiencesService) {}
    
      @UseGuards(AuthGuard)
      @Post()
      async createExperience(
        @Body() createExperienceDto: CreateExperienceDto,
      ) {
        return this.experiencesService.createExperience(createExperienceDto); 
      }
    
      @Get()
      async getExperiences(
      ) {
        return this.experiencesService.getExperiences();
      }
    
      @Get(':experienceId')
      async getExperienceById(
        @Param('experienceId') experienceId: string,
      ) {
        return this.experiencesService.getExperienceById(experienceId);
      }
    
      @UseGuards(AuthGuard)
      @Patch(':experienceId')
      async updateExperience(
        @Param('experienceId') experienceId: string,
        @Body() updateExperienceDto: UpdateExperienceDto,
      ) {
        return this.experiencesService.updateExperience(experienceId,updateExperienceDto); 
      }
    
      @UseGuards(AuthGuard)
      @Delete(':experienceId')
      async deleteProject(
        @Param('experienceId') experienceId: string,
      ) {
        return this.experiencesService.deleteExperience(experienceId); 
      }
}
