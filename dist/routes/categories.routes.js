"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
const categories = [];
categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;
    const category = {
        id: (0, uuid_1.v4)(),
        name,
        description,
    };
    categories.push(category);
    return response.status(201).send();
});
