import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Project extends Document {

  @Prop({ required: true })
  name: string;  // Name of the project
  
  @Prop({ required: true })
  description: string;  // Description of the project
  
  @Prop({ required: true })
  gitHubLink: string; // Link to the project's GitHub repository
  
  @Prop({ required: false })
  techs: Array<string>; // Technologies used in the project

  @Prop({ required: false })
  images: Array<string>; // Array of image URLs related to the project

}

export const ProjectSchema = SchemaFactory.createForClass(Project);