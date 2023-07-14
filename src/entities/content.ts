import { IUserDto } from "./user";

export interface ICreateContentDto {
  videoUrl: string;
  comment: string;
  rating: number;
}

export interface ICreateContent extends ICreateContentDto {
  videoTitle: string;
  thumbnailUrl: string;
  creatorName: string;
  creatorUrl: string;
  userId: string;
}

export interface IContent extends ICreateContent {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContentWithUserDto extends IContent {
  user: IUserDto;
}