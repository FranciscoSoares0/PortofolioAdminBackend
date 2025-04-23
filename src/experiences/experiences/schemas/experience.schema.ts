import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Experience extends Document {

  @Prop({ required: true })
  dates: string; 
  
  @Prop({ required: true })
  position: string; 
  
  @Prop({ required: true })
  company: string;
  
  @Prop({ required: true })
  description: string; 
  
  @Prop({ required: false })
  techs: Array<string>; 

}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);