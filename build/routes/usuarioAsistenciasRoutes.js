"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioAsistenciaController_1 = __importDefault(require("../controllers/usuarioAsistenciaController"));
class UsuarioAsistenciasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usuarioAsistenciaController_1.default.listUsuarioAsistencias);
        this.router.get('/:idusuario/:idasistencia', usuarioAsistenciaController_1.default.usuarioAsistenciaById);
        this.router.post('/', usuarioAsistenciaController_1.default.createUsuarioAsistencia);
        // this.router.delete('/:id',usuarioAsistenciasController.deleteUsuarioAsistencia); //Por ahora no se usara el actualizar ni delete en esta tabla intermedia
        // this.router.put('/:id',usuarioAsistenciasController.updateUsuarioAsistencia);
    }
}
const usuarioAsistenciasRoutes = new UsuarioAsistenciasRoutes();
exports.default = usuarioAsistenciasRoutes.router;
