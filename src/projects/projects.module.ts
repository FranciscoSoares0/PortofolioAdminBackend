import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectSchema } from './schemas/project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
      name: Project.name,
      schema: ProjectSchema,
      },

    ]),
  ],
  controllers:[ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
