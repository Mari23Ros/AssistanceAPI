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
class ObrasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obras = yield database_1.default.query('SELECT * FROM obra');
                res.json(obras);
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    obraById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const obrasById = yield database_1.default.query('SELECT * FROM obra WHERE idobra = ?', [id]);
                if (obrasById.length > 0) {
                    return res.json(obrasById[0]);
                }
                else {
                    res.status(404).json({ message: "La obra no existe" });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
            // res.json({text: 'este es una obra ' + req.params.id });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO obra SET ?', [req.body]);
                res.json({ message: 'obra guardada con éxito' });
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
    deleteObra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const query = yield database_1.default.query('DELETE FROM obra WHERE idobra = ?', [id]);
                if (query.affectedRows > 0) {
                    res.json({ message: "La obra fue eliminada correctamente" });
                }
                else {
                    res.status(404).json({ message: 'La obra que intenta eliminar no existe, vuelva a revisar el registro' });
                }
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
            // res.json('Eliminando obra ' + req.params.id);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query('UPDATE obra SET ? WHERE idobra = ?', [req.body, id]);
                res.json({ message: "La obra fue actualizada correctamente" });
            }
            catch (err) {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
            }
        });
    }
}
const obrasController = new ObrasController();
exports.default = obrasController;
