import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './dtos/createProject.dto';
import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateProjectDto } from './dtos/updateProject.dto';

@Controller('projects')
export class ProjectsController {

  constructor(private readonly projectService: ProjectsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.createProject(createProjectDto); 
  }

  @Get()
  async getProjects(
  ) {
    return this.projectService.getProjects();
  }

  @Get(':projectId')
  async getProjectById(
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.getProjectById(projectId);
  }

  @UseGuards(AuthGuard)
  @Patch(':projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(projectId,updateProjectDto); 
  }

  @UseGuards(AuthGuard)
  @Delete(':projectId')
  async deleteProject(
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.deleteProject(projectId); 
  }
}
