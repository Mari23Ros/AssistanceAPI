"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UsuarioController {
    listaUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield database_1.default.query('SELECT * FROM usuario');
                res.json(usuarios);
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    usuarioById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const usuariosById = yield database_1.default.query('SELECT * FROM usuario WHERE idusuario = ?', [id]);
                if (usuariosById.length > 0) {
                    return res.json(usuariosById[0]);
                }
                else {
                    res.status(404).json({ message: "El usuario no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { correo } = req.params;
                const { contrasenha } = req.params;
                const usuariosById = yield database_1.default.query('SELECT * FROM usuario WHERE correo = ? AND contrasenha = ?', [correo, contrasenha]);
                if (usuariosById.length > 0) {
                    return res.json(usuariosById[0]);
                }
                else {
                    res.status(404).json({ message: "El usuario no existe o la contrasenha no es la correcta" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    usuarioByCorreo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { correo } = req.params;
                const usuariosById = yield database_1.default.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
                if (usuariosById.length > 0) {
                    return res.json(usuariosById[0]);
                }
                else {
                    res.status(404).json({ message: "El usuario no existe o ha ingresado campos vacíos" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO usuario SET ?', [req.body]);
                res.json({ message: 'registro guardado con éxito' });
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let statusQuery = yield database_1.default.query('DELETE FROM usuario WHERE idusuario = ?', [id]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "El usuario fue eliminado con éxito" });
                }
                else {
                    res.status(404).json({ message: "El registro no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // console.log([req.body]);
                let statusQuery = yield database_1.default.query('UPDATE usuario SET ? WHERE idusuario = ?', [req.body, id]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "El usuario fue actualizado con éxito" });
                }
                else {
                    res.status(404).json({ message: "El usuario editado no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    updateContrasenha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idusuario = req.body.idusuario;
                const contrasenha = req.body.contrasenha;
                // console.log('mira', req.body, idusuario, contrasenha);
                let statusQuery = yield database_1.default.query('UPDATE usuario SET contrasenha = ? WHERE idusuario = ?', [contrasenha, idusuario]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "La contraseña fue cambiada con éxito" });
                }
                else {
                    res.status(404).json({ message: "El usuario no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
