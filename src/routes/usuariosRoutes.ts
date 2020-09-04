import { Router } from 'express';
import usuarioController from '../controllers/usuarioController';

class UsuariosRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', usuarioController.listaUsuarios);
        this.router.get('/:id', usuarioController.usuarioById);
        // this.router.get('/:correo/:contrasenha', usuarioController.login);
        this.router.get('/porCorreo/:correo', usuarioController.usuarioByCorreo);
        this.router.post('/', usuarioController.createUsuario);
        this.router.delete('/:id', usuarioController.deleteUsuario);
        this.router.put('/editarUsuario/:id', usuarioController.updateUsuario);
        // this.router.put('/:idusuario/:contrasenha', usuarioController.updateContrasenha);
        this.router.put('/cambiarContrasenha', usuarioController.updateContrasenha);
    }

}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;