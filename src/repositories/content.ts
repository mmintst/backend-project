import { PrismaClient } from "@prisma/client";
import { ICreateContent, IContentWithUserDto } from "../entities/content";
import { IRepositoryContent } from ".";

export function newRepositoryContent(db: PrismaClient): IRepositoryContent {
    return new RepositoryContent(db)
}

const includeUserDto = {
    user: {
        select: {
            id: true,
            username: true,
            name: true,
            registeredAt: true,
            password: false,
        }
    }
}

class RepositoryContent implements IRepositoryContent {
    private readonly db: PrismaClient

    constructor(db: PrismaClient) {
        this.db = db
    }

    async createContent(content: ICreateContent): Promise<IContentWithUserDto> {
        return await this.db.content.create({
            include: includeUserDto,
            data: {
                ...content,
                userId: undefined,
                user: {
                    connect: {
                        id: content.userId,
                    }
                }
            }
        })
    }

    async getContents(): Promise<IContentWithUserDto[]> {
        return await this.db.content
        .findMany({
            include: includeUserDto,
        })
        .then((contents) => {
            if (!contents) {
                return Promise.resolve([])
            }

            return Promise.resolve(contents)
        })
        .catch((err) => Promise.reject(`failed to get contents: ${err}`))
    }

    async getContent(id: number): Promise<IContentWithUserDto> {
        return await this.db.content
        .findFirst({
            include: includeUserDto,
        })
        .then((content) => {
            if (!content) {
                return Promise.reject(`content ${id} not found`);
            }

            return Promise.resolve(content)
        })
        .catch((err) => Promise.reject(`failed to get content ${id}: ${err}`))
    }

    async deleteContent(id: number): Promise<IContentWithUserDto> {
        return await this.db.content
        .delete({
            include: includeUserDto,
            where: {id},
        })
        .then((content) =>  Promise.resolve(content))
        .catch((err) => Promise.reject(`failed to delete content ${id}: ${err}`));
    }
}