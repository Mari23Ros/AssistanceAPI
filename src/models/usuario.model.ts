export class UsuarioModel{
    idusuario: string;
    nombre: string;
    correo: string;
    contrasenha: string;
    rol: string;

    constructor(){
        this.idusuario ="";
        this.nombre ="";
        this.correo = "";
        this.contrasenha = "";
        this.rol= "";
    }
}