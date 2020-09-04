"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asistenciaController_1 = __importDefault(require("../controllers/asistenciaController"));
class AsistenciasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', asistenciaController_1.default.listaAsistenciaVista);
        this.router.get('/porRangoDeFechas/:idobra/:fechaInicio/:fechaFin', asistenciaController_1.default.asistenciaPorRangoDeFecha);
        this.router.get('/porTrabajador/:idtrabajador/:fechaInicio/:fechaFin', asistenciaController_1.default.asistenciaPorTrabajador);
        this.router.get('/:id', asistenciaController_1.default.asistenciaById);
        this.router.post('/', asistenciaController_1.default.createAsistencia);
        this.router.delete('/:id', asistenciaController_1.default.deleteAsistencia);
        this.router.put('/:id', asistenciaController_1.default.updateAsistencia);
        this.router.put('/:idasistencia/:fechaSalida', asistenciaController_1.default.updateSalida);
    }
}
const asistenciasRoutes = new AsistenciasRoutes();
exports.default = asistenciasRoutes.router;
