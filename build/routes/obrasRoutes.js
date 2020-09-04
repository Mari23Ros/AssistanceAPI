"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const obraController_1 = __importDefault(require("../controllers/obraController"));
class ObrasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', obraController_1.default.list);
        this.router.get('/:id', obraController_1.default.obraById);
        this.router.post('/', obraController_1.default.create);
        this.router.delete('/:id', obraController_1.default.deleteObra);
        this.router.put('/:id', obraController_1.default.update);
    }
}
const obrasRoutes = new ObrasRoutes();
exports.default = obrasRoutes.router;
