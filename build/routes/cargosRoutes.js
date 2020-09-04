"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cargosController_1 = __importDefault(require("../controllers/cargosController"));
class CargosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', cargosController_1.default.listCargos);
        this.router.get('/:id', cargosController_1.default.cargoById);
        this.router.post('/', cargosController_1.default.createCargo);
        this.router.delete('/:id', cargosController_1.default.deleteCargo);
        this.router.put('/:id', cargosController_1.default.updateCargo);
    }
}
const cargosRoutes = new CargosRoutes();
exports.default = cargosRoutes.router;
