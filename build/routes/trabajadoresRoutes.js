"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trabajadorController_1 = __importDefault(require("../controllers/trabajadorController"));
class TrabajadoresRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', trabajadorController_1.default.listaTrabajadores);
        this.router.get('/:id', trabajadorController_1.default.trabajadorById);
        this.router.get('/trabajadorPorObra/:idobra', trabajadorController_1.default.listaTrabajadoresPorObra);
        this.router.post('/', trabajadorController_1.default.createTrabajador);
        this.router.delete('/:id', trabajadorController_1.default.deleteTrabajador);
        this.router.put('/:id', trabajadorController_1.default.updateTrabajador);
    }
}
const trabajadoresRoutes = new TrabajadoresRoutes();
exports.default = trabajadoresRoutes.router;
