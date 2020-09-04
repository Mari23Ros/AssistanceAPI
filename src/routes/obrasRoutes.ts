import { Router } from 'express';

import obrasController from '../controllers/obraController';

class ObrasRoutes {
    public router: Router =  Router();

    constructor(){
        this.config()
    }
    config(): void{
        this.router.get('/', obrasController.list );
        this.router.get('/:id', obrasController.obraById );
        this.router.post('/', obrasController.create);
        this.router.delete('/:id',obrasController.deleteObra);
        this.router.put('/:id',obrasController.update);
    }
}
const obrasRoutes = new ObrasRoutes();
export default obrasRoutes.router;