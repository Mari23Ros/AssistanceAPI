"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioAsistenciaModel = void 0;
const usuario_model_1 = require("./usuario.model");
const asistencia_model_1 = require("./asistencia.model");
class UsuarioAsistenciaModel {
    constructor() {
        this.usuario_idusuario = new usuario_model_1.UsuarioModel();
        this.asistencia_idasistencia = new asistencia_model_1.AsistenciaModel();
    }
}
exports.UsuarioAsistenciaModel = UsuarioAsistenciaModel;
