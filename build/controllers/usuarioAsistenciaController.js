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
class UsuarioAsistenciaController {
    listUsuarioAsistencias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioAsistencias = yield database_1.default.query('SELECT * FROM usuarioasistencia');
                res.json(usuarioAsistencias);
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    usuarioAsistenciaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idusuario } = req.params;
                const { idasistencia } = req.params;
                const usuariOAsistenciasById = yield database_1.default.query('SELECT * FROM usuarioasistencia WHERE usuario_idusuario = ? AND asistencia_idasistencia = ?', [idusuario, idasistencia]);
                if (usuariOAsistenciasById.length > 0) {
                    return res.json(usuariOAsistenciasById[0]);
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
    createUsuarioAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO usuarioasistencia SET ?', [req.body]);
                res.json({ message: 'registro guardado con éxito' });
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    deleteUsuarioAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idusuario } = req.params;
                const { idasistencia } = req.params;
                let statusQuery = yield database_1.default.query('DELETE FROM usuarioasistencia WHERE usuario_idusuario = ? AND asistencia_idasistencia', [idusuario, idasistencia]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "El registro fue eliminado con éxito" });
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
    updateUsuarioAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idusuario } = req.params;
                const { idasistencia } = req.params;
                let statusQuery = yield database_1.default.query('UPDATE usuarioasistencia SET ? WHERE idusuario = ? AND idasistencia = ?', [req.body, idusuario, idasistencia]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "El registro fue actualizado con éxito" });
                }
                else {
                    res.status(404).json({ message: "El registro editado no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
}
const usuarioAsistenciasController = new UsuarioAsistenciaController();
exports.default = usuarioAsistenciasController;
