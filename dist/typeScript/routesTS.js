"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const CreateCourseServiceTS_1 = __importDefault(require("./CreateCourseServiceTS"));
function createCourse(request, response) {
    CreateCourseServiceTS_1.default.execute({
        name: 'NodeJS',
        educator: 'Dani',
        duration: 10,
    });
    CreateCourseServiceTS_1.default.execute({
        name: 'Typescript',
        educator: 'Felipy',
    });
    return response.send();
}
exports.createCourse = createCourse;
