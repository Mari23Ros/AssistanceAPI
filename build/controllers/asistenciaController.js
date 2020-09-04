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
class AsistenciaController {
    listAsistenciaSimple(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cargos = yield database_1.default.query('SELECT * FROM asistencia');
                res.json(cargos);
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    listaAsistenciaVista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cargos = yield database_1.default.query(`SELECT
                                                asistencia.idasistencia AS idasistencia,
                                                usuarioasistencia.usuario_idusuario AS idusuario,
                                                usuario.nombre AS nombreUsuario,
                                                usuario.correo AS correoUsuario,
                                                usuario.rol AS rolUsuario,
                                                asistencia.fechaYHoraEntrada AS fechaYHoraEntrada,
                                                asistencia.fechaYHoraSalida AS fechaYHoraSalida,
                                                asistencia.trabajador_idtrabajador AS idtrabajador,
                                                trabajador.nombreTrabajador AS nombreTrabajador,
                                                trabajador.cargo_idcargo AS idcargo,
                                                cargo.nombreCargo AS nombreCargo,
                                                cargo.horasSemanalesAsignadas AS horasSemenalesAsignadas,
                                                cargo.remuneracionMensual AS remuneracionMensual,
                                                trabajador.obra_idobra AS idobra,
                                                obra.nombreObra AS nombreObra,
                                                obra.estado AS estado
                                            FROM 
                                                asistencia
                                            
                                            LEFT JOIN usuarioasistencia ON asistencia.idasistencia = usuarioasistencia.asistencia_idasistencia
                                            LEFT JOIN usuario ON usuarioasistencia.usuario_idusuario = usuario.idusuario
                                            LEFT JOIN trabajador ON asistencia.trabajador_idtrabajador = trabajador.idtrabajador
                                            LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                            LEFT JOIN obra ON trabajador.obra_idobra = obra.idobra
                                            `);
                res.json(cargos);
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    asistenciaPorRangoDeFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idobra } = req.params;
                const { fechaInicio } = req.params;
                const { fechaFin } = req.params;
                const asistencias = yield database_1.default.query(`SELECT
                                                    asistencia.idasistencia,
                                                    asistencia.trabajador_idtrabajador AS trabajador_idtrabajador,
                                                    trabajador.nombreTrabajador AS nombreTrabajador,
                                                    trabajador.obra_idobra AS obra_idobra,
                                                    trabajador.cargo_idcargo AS cargo_idcargo,
                                                    cargo.nombreCargo AS nombreCargo,
                                                    cargo.horasSemanalesAsignadas AS horasSemanalesAsignadas,
                                                    cargo.remuneracionMensual AS remuneracionMensual,
                                                    asistencia.fechaYHoraEntrada AS fechaYHoraEntrada,
                                                    asistencia.fechaYHoraSalida AS fechaYHoraSalida
                                                FROM
                                                    asistencia
                                                LEFT JOIN trabajador ON asistencia.trabajador_idtrabajador = trabajador.idtrabajador
                                                LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                                WHERE
                                                    trabajador.obra_idobra = ? && fechaYHoraEntrada BETWEEN ?
                                                AND ?`, [idobra, fechaInicio, fechaFin]);
                res.json(asistencias);
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    asistenciaPorTrabajador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idtrabajador } = req.params;
                const { fechaInicio } = req.params;
                const { fechaFin } = req.params;
                const asistencias = yield database_1.default.query(`SELECT
                                                    asistencia.idasistencia,
                                                    asistencia.trabajador_idtrabajador AS trabajador_idtrabajador,
                                                    trabajador.nombreTrabajador AS nombreTrabajador,
                                                    trabajador.obra_idobra AS obra_idobra,
                                                    trabajador.cargo_idcargo AS cargo_idcargo,
                                                    cargo.nombreCargo AS nombreCargo,
                                                    cargo.horasSemanalesAsignadas AS horasSemanalesAsignadas,
                                                    cargo.remuneracionMensual AS remuneracionMensual,
                                                    asistencia.fechaYHoraEntrada AS fechaYHoraEntrada,
                                                    asistencia.fechaYHoraSalida AS fechaYHoraSalida
                                                FROM
                                                    asistencia
                                                LEFT JOIN trabajador ON asistencia.trabajador_idtrabajador = trabajador.idtrabajador
                                                LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                                WHERE
                                                    trabajador.idtrabajador = ? && fechaYHoraEntrada BETWEEN ?
                                                AND ?`, [idtrabajador, fechaInicio, fechaFin]);
                res.json(asistencias);
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    asistenciaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const asistenciasById = yield database_1.default.query('SELECT * FROM asistencia WHERE idasistencia = ?', [id]);
                if (asistenciasById.length > 0) {
                    return res.json(asistenciasById[0]);
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
    createAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO asistencia SET ?', [req.body]);
                res.json({ message: 'registro guardado con éxito' });
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    deleteAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let statusQuery = yield database_1.default.query('DELETE FROM asistencia WHERE idasistencia = ?', [id]);
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
    updateAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let statusQuery = yield database_1.default.query('UPDATE asistencia SET ? WHERE idasistencia = ?', [req.body, id]);
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
    updateSalida(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idasistencia } = req.params;
                const { fechaSalida } = req.params;
                let statusQuery = yield database_1.default.query('UPDATE asistencia SET asistencia.fechaYHoraSalida = ? WHERE idasistencia = ?', [fechaSalida, idasistencia]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "Salida registrada correctamente" });
                }
                else {
                    res.status(404).json({ message: "No se pudo registrar la salida" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
}
const asistenciaController = new AsistenciaController();
exports.default = asistenciaController;
