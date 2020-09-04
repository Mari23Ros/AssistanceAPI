import { Router } from 'express';

import cargosController from '../controllers/cargosController';

class CargosRoutes {
    public router: Router =  Router();

    constructor(){
        this.config()
    }
    config(): void{
        this.router.get('/', cargosController.listCargos);
        this.router.get('/:id', cargosController.cargoById );
        this.router.post('/', cargosController.createCargo);
        this.router.delete('/:id',cargosController.deleteCargo);
        this.router.put('/:id',cargosController.updateCargo);
    }
}
const cargosRoutes = new CargosRoutes();
export default cargosRoutes.router;