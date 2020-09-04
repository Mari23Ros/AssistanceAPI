export class AsistenciaModel {
    idasistencia: string;
    fechaYHoraEntrada: Date;
    fechaYHoraSalida: Date;

    constructor(){
        this.idasistencia="";
        this.fechaYHoraEntrada = new Date();
        this.fechaYHoraSalida = new Date();
    }
}