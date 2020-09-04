import { UsuarioModel } from './usuario.model';
import { AsistenciaModel } from './asistencia.model';
export class UsuarioAsistenciaModel{
    usuario_idusuario: UsuarioModel;
    asistencia_idasistencia: AsistenciaModel;

    constructor(){
        this.usuario_idusuario = new UsuarioModel();
        this.asistencia_idasistencia = new AsistenciaModel();
    }
}