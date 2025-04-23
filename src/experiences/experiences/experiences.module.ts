import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience, ExperienceSchema } from './schemas/experience.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
      name: Experience.name,
      schema: ExperienceSchema,
      },

    ]),
  ],
  providers: [ExperiencesService],
  controllers: [ExperiencesController]
})
export class ExperiencesModule {}