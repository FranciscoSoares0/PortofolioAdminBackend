import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dtos/createProject.dto';
import { UpdateProjectDto } from './dtos/updateProject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    const { name, description, gitHubLink, techs, images } = createProjectDto;

    // Create a new project instance
    const newProject = new this.projectModel({
      name,
      description,
      gitHubLink,
      techs,
      images,
    });

    // Save the project to the database
    return await newProject.save();

  }

  async getProjects() {
    // Find projects associated with the user ID
    const projects = await this.projectModel.find();
    if(!projects || projects.length === 0) {
      throw new NotFoundException('No projects found');
    }
    return projects;
  }

  async getProjectById(projectId: string) {
    // Find project by project id
    const project = await this.projectModel.findById(projectId);
    if(!project) {
      throw new NotFoundException('No project found with that id');
    }
    return project;
  }

  async updateProject(projectId:string,updateProjectDto:UpdateProjectDto) {
    // Destructure the updateProjectDto to get the project ID and other fields
    const { name, description, gitHubLink, techs, images } = updateProjectDto;

    const project = await this.projectModel.findById(projectId);

    if (!project) 
      throw new NotFoundException('Project not found');
    
    if (name !== undefined) {
      project.name = name;
    }
    if (description !== undefined) {
      project.description = description;
    }
    if (gitHubLink !== undefined) {
      project.gitHubLink = gitHubLink;
    }
    if (techs !== undefined) {
      project.techs = techs;
    }
    if (images !== undefined) {
      project.images = images;
    }
  
    return await project.save();

  }

  async deleteProject(projectId: string) {
    // Find the project by ID
    const project = await this.projectModel.findById(projectId);

    if (!project)
      throw new NotFoundException('Project not found');

    return await this.projectModel.findByIdAndDelete(projectId);
  }

}
