import { IContentWithUserDto, ICreateContent } from "../entities/content";
import { ICreateUser, IUser } from "../entities/user"
import { newRepositoryUser } from "./user"
import { newRepositoryContent } from "./content";

export interface IRepositoryUser {
    createUser(user: ICreateUser): Promise<IUser>
    getUser(username: string): Promise<IUser> 
}

export interface IRepositoryContent {
    createContent(content: ICreateContent): Promise<IContentWithUserDto>;
    getContents(): Promise<IContentWithUserDto[]>;
    getContent(id: number): Promise<IContentWithUserDto>;
    deleteContent(id: number): Promise<IContentWithUserDto>;
  }

export default {
    newRepositoryUser,
    newRepositoryContent
}