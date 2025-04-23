import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Experience } from './schemas/experience.schema';
import { Model } from 'mongoose';
import { CreateExperienceDto } from './dtos/createExperience.dto';
import { UpdateExperienceDto } from './dtos/updateExperience.dto';

@Injectable()
export class ExperiencesService {
    constructor(
        @InjectModel(Experience.name) private experienceModel: Model<Experience>,
      ) {}
    
      async createExperience(createExperienceDto: CreateExperienceDto) {
        const { dates, position, company, description, techs } = createExperienceDto;
    
        // Create a new Experience instance
        const newExperience = new this.experienceModel({
          dates,
          position,
          company,
          description,
          techs,
        });
    
        // Save the Experience to the database
        return await newExperience.save();
    
      }
    
      async getExperiences() {
        // Find Experiences associated with the user ID
        const experiences = await this.experienceModel.find();
        if(!experiences || experiences.length === 0) {
          throw new NotFoundException('No experiences found');
        }
        return experiences;
      }
    
      async getExperienceById(experienceId: string) {
        // Find Experience by Experience id
        const experience = await this.experienceModel.findById(experienceId);
        if(!experience) {
          throw new NotFoundException('No experience found with that id');
        }
        return experience;
      }
    
      async updateExperience(experienceId:string,updateExperienceDto:UpdateExperienceDto) {
        // Destructure the updateExperienceDto to get the Experience ID and other fields
        const { dates, position, company, description, techs } = updateExperienceDto;
    
        const experience = await this.experienceModel.findById(experienceId);
    
        if (!experience) 
          throw new NotFoundException('Experience not found');
        
        if (dates !== undefined) {
            experience.dates = dates;
        }
        if (position !== undefined) {
            experience.position = position;
        }
        if (company !== undefined) {
            experience.company = company;
        }
        if (description !== undefined) {
            experience.description = description;
        }
        if (techs !== undefined) {
            experience.techs = techs;
        }

        return await experience.save();
    
      }
    
      async deleteExperience(experienceId: string) {
        // Find the Experience by ID
        const experience = await this.experienceModel.findById(experienceId);
    
        if (!experience)
          throw new NotFoundException('Experience not found');
    
        return await this.experienceModel.findByIdAndDelete(experienceId);
      }
}
