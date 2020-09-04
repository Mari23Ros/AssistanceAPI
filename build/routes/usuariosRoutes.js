"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
class UsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usuarioController_1.default.listaUsuarios);
        this.router.get('/:id', usuarioController_1.default.usuarioById);
        // this.router.get('/:correo/:contrasenha', usuarioController.login);
        this.router.get('/porCorreo/:correo', usuarioController_1.default.usuarioByCorreo);
        this.router.post('/', usuarioController_1.default.createUsuario);
        this.router.delete('/:id', usuarioController_1.default.deleteUsuario);
        this.router.put('/editarUsuario/:id', usuarioController_1.default.updateUsuario);
        // this.router.put('/:idusuario/:contrasenha', usuarioController.updateContrasenha);
        this.router.put('/cambiarContrasenha', usuarioController_1.default.updateContrasenha);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
