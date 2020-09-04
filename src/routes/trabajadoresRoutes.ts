import { Router } from 'express';

import trabajadorController from '../controllers/trabajadorController';

class TrabajadoresRoutes {
    public router: Router =  Router();

    constructor(){
        this.config()
    }
    config(): void{
        this.router.get('/', trabajadorController.listaTrabajadores);
        this.router.get('/:id', trabajadorController.trabajadorById );
        this.router.get('/trabajadorPorObra/:idobra', trabajadorController.listaTrabajadoresPorObra );
        this.router.post('/', trabajadorController.createTrabajador);
        this.router.delete('/:id',trabajadorController.deleteTrabajador);
        this.router.put('/:id',trabajadorController.updateTrabajador);
    }
}
const trabajadoresRoutes = new TrabajadoresRoutes();
export default trabajadoresRoutes.router;