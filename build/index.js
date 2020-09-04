"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const obrasRoutes_1 = __importDefault(require("./routes/obrasRoutes"));
const cargosRoutes_1 = __importDefault(require("./routes/cargosRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const asistenciasRoutes_1 = __importDefault(require("./routes/asistenciasRoutes"));
const usuarioAsistenciasRoutes_1 = __importDefault(require("./routes/usuarioAsistenciasRoutes"));
const trabajadoresRoutes_1 = __importDefault(require("./routes/trabajadoresRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json()); // Permite que el servidor pueda aceptar y entender formatos json
        this.app.use(express_1.default.urlencoded({ extended: false })); // En caso se quiera enviar de un formulario html
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/obras', obrasRoutes_1.default);
        this.app.use('/api/cargos', cargosRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/asistencias', asistenciasRoutes_1.default);
        this.app.use('/api/usuarioasistencias', usuarioAsistenciasRoutes_1.default);
        this.app.use('/api/trabajadores', trabajadoresRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
