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
class TrabajadorController {
    listaTrabajadores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trabajadores = yield database_1.default.query('SELECT * FROM trabajador');
                res.json(trabajadores);
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    listaTrabajadoresPorObra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('prueba', req.params.idobra);
            try {
                const { idobra } = req.params;
                const trabajadores = yield database_1.default.query(`SELECT
                                                        trabajador.idtrabajador AS idtrabajador,
                                                        trabajador.nombreTrabajador AS nombreTrabajador,
                                                        trabajador.dni AS dni,
                                                        trabajador.obra_idobra AS obra_idobra,
                                                        trabajador.telefono AS telefono,
                                                        trabajador.cargo_idcargo AS cargo_idcargo,
                                                        cargo.nombreCargo AS nombreCargo
                                                    FROM
                                                        trabajador
                                                    LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                                    WHERE
                                                        trabajador.obra_idobra = ?`, [idobra]);
                if (trabajadores.length > 0) {
                    return res.json(trabajadores);
                }
                else {
                    res.status(404).json({ message: "No hay ningún trabajador asignado a esta obra" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    trabajadorById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const trabajadoresById = yield database_1.default.query(`SELECT
                                                            trabajador.idtrabajador AS idtrabajador,
                                                            trabajador.nombreTrabajador AS nombreTrabajador,
                                                            trabajador.dni AS dni,
                                                            trabajador.obra_idobra AS obra_idobra,
                                                            trabajador.telefono AS telefono,
                                                            trabajador.cargo_idcargo AS cargo_idcargo,
                                                            cargo.nombreCargo AS nombreCargo
                                                        FROM
                                                            trabajador
                                                        LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                                        WHERE
                                                            trabajador.idtrabajador = ?`, [id]);
                if (trabajadoresById.length > 0) {
                    return res.json(trabajadoresById[0]);
                }
                else {
                    res.status(404).json({ message: "El trabajador no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    createTrabajador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO trabajador SET ?', [req.body]);
                res.json({ message: 'registro guardado con éxito' });
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    deleteTrabajador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let statusQuery = yield database_1.default.query('DELETE FROM trabajador WHERE idtrabajador = ?', [id]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "El trabajador fue eliminado con éxito" });
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
    updateTrabajador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let statusQuery = yield database_1.default.query('UPDATE trabajador SET ? WHERE idtrabajador = ?', [req.body, id]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "El trabajador fue actualizado con éxito" });
                }
                else {
                    res.status(404).json({ message: "El trabajador editado no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
}
const trabajadorController = new TrabajadorController();
exports.default = trabajadorController;
