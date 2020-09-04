import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import obrasRoutes from './routes/obrasRoutes';
import cargosRoutes from './routes/cargosRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import asistenciasRoutes from './routes/asistenciasRoutes';
import usuarioAsistenciasRoutes from './routes/usuarioAsistenciasRoutes';
import trabajadoresRoutes from './routes/trabajadoresRoutes';
class Server{

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json()); // Permite que el servidor pueda aceptar y entender formatos json
        this.app.use(express.urlencoded({extended: false})); // En caso se quiera enviar de un formulario html
    }

    routes(): void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/obras',obrasRoutes);
        this.app.use('/api/cargos', cargosRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/asistencias', asistenciasRoutes);
        this.app.use('/api/usuarioasistencias', usuarioAsistenciasRoutes);
        this.app.use('/api/trabajadores', trabajadoresRoutes)
    }
    start(): void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log('Server on port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();