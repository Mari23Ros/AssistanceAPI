import { Router } from 'express';

import usuarioAsistenciasController from '../controllers/usuarioAsistenciaController';

class UsuarioAsistenciasRoutes {
    public router: Router =  Router();

    constructor(){
        this.config()
    }
    config(): void{
        this.router.get('/', usuarioAsistenciasController.listUsuarioAsistencias);
        this.router.get('/:idusuario/:idasistencia', usuarioAsistenciasController.usuarioAsistenciaById);
        this.router.post('/', usuarioAsistenciasController.createUsuarioAsistencia);
        // this.router.delete('/:id',usuarioAsistenciasController.deleteUsuarioAsistencia); //Por ahora no se usara el actualizar ni delete en esta tabla intermedia
        // this.router.put('/:id',usuarioAsistenciasController.updateUsuarioAsistencia);
    }
}
const usuarioAsistenciasRoutes = new UsuarioAsistenciasRoutes();
export default usuarioAsistenciasRoutes.router;