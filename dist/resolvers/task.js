"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = void 0;
const Task_1 = require("../entities/Task");
const type_graphql_1 = require("type-graphql");
let TaskResolver = class TaskResolver {
    async tasks() {
        return Task_1.Task.find();
    }
    createTask(title, description) {
        return Task_1.Task.create({ title, description }).save();
    }
    ;
    async task(id) {
        return Task_1.Task.findOne({ id });
    }
    async deleteTask(id) {
        if (await Task_1.Task.findOne({ id })) {
            await Task_1.Task.delete(id);
            return true;
        }
        else {
            return false;
        }
    }
    async updateTask(title, description, id) {
        const task = await Task_1.Task.findOne(id);
        if (!task) {
            return null;
        }
        if (typeof title !== "undefined") {
            await Task_1.Task.update({ id }, { title });
        }
        if (typeof description !== "undefined") {
            await Task_1.Task.update({ id }, { description });
        }
        return task;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.Task]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)("title", () => String)),
    __param(1, (0, type_graphql_1.Arg)("description", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Query)(() => Task_1.Task, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "task", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("title", () => String, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)("description", () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TaskResolver);
exports.TaskResolver = TaskResolver;
//# sourceMappingURL=task.js.map