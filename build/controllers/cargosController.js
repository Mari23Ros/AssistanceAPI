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
class CargosController {
    listCargos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cargos = yield database_1.default.query('SELECT * FROM cargo');
                res.json(cargos);
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    cargoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cargosById = yield database_1.default.query('SELECT * FROM cargo WHERE idcargo = ?', [id]);
                if (cargosById.length > 0) {
                    return res.json(cargosById[0]);
                }
                else {
                    res.status(404).json({ message: "El cargo no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    createCargo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO cargo SET ?', [req.body]);
                res.json({ message: 'registro guardado con éxito' });
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    deleteCargo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                let statusQuery = yield database_1.default.query('DELETE FROM cargo WHERE idcargo = ?', [id]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "El cargo fue eliminado con éxito" });
                }
                else {
                    res.status(404).json({ message: "El registro no existe" });
                }
            }
            catch (err) {
                // console.log('mira aquiii', err);
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage }); // .send({ error: err, message: err.message })
            }
        });
    }
    updateCargo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let statusQuery = yield database_1.default.query('UPDATE cargo SET ? WHERE idcargo = ?', [req.body, id]);
                if (statusQuery.affectedRows > 0) {
                    res.json({ message: "El cargo fue actualizado con éxito" });
                }
                else {
                    res.status(404).json({ message: "El cargo editado no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage }); // .send({ error: err, message: err.message })
            }
        });
    }
}
const cargosController = new CargosController();
exports.default = cargosController;
