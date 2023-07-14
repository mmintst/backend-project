"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRepositoryContent = void 0;
function newRepositoryContent(db) {
    return new RepositoryContent(db);
}
exports.newRepositoryContent = newRepositoryContent;
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
};
class RepositoryContent {
    constructor(db) {
        this.db = db;
    }
    async createContent(content) {
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
        });
    }
    async getContents() {
        return await this.db.content
            .findMany({
            include: includeUserDto,
        })
            .then((contents) => {
            if (!contents) {
                return Promise.resolve([]);
            }
            return Promise.resolve(contents);
        })
            .catch((err) => Promise.reject(`failed to get contents: ${err}`));
    }
    async getContent(id) {
        return await this.db.content
            .findFirst({
            include: includeUserDto,
        })
            .then((content) => {
            if (!content) {
                return Promise.reject(`content ${id} not found`);
            }
            return Promise.resolve(content);
        })
            .catch((err) => Promise.reject(`failed to get content ${id}: ${err}`));
    }
    async deleteContent(id) {
        return await this.db.content
            .delete({
            include: includeUserDto,
            where: { id },
        })
            .then((content) => Promise.resolve(content))
            .catch((err) => Promise.reject(`failed to delete content ${id}: ${err}`));
    }
}
//# sourceMappingURL=content.js.map