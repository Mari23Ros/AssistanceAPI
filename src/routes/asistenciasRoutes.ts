import { Router } from 'express';

import asistenciaController from '../controllers/asistenciaController';

class AsistenciasRoutes {
    public router: Router =  Router();

    constructor(){
        this.config()
    }
    config(): void{
        this.router.get('/', asistenciaController.listaAsistenciaVista);
        this.router.get('/porRangoDeFechas/:idobra/:fechaInicio/:fechaFin', asistenciaController.asistenciaPorRangoDeFecha);
        this.router.get('/porTrabajador/:idtrabajador/:fechaInicio/:fechaFin', asistenciaController.asistenciaPorTrabajador);
        this.router.get('/:id', asistenciaController.asistenciaById );
        this.router.post('/', asistenciaController.createAsistencia);
        this.router.delete('/:id',asistenciaController.deleteAsistencia);
        this.router.put('/:id',asistenciaController.updateAsistencia);
        this.router.put('/:idasistencia/:fechaSalida', asistenciaController.updateSalida);
    }
}
const asistenciasRoutes = new AsistenciasRoutes();
export default asistenciasRoutes.router;