import { Request, Response } from 'express';

import pool from '../database';

class UsuarioController{
    public async listaUsuarios (req: Request, res: Response) {
        try{
            const usuarios = await pool.query('SELECT * FROM usuario');
            res.json(usuarios);
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async usuarioById(req: Request, res: Response): Promise<any>{
        try{
            const { id } = req.params;
            const usuariosById = await pool.query('SELECT * FROM usuario WHERE idusuario = ?', [id]);
            if(usuariosById.length > 0){
                return res.json(usuariosById[0]);
            }
            else{
                res.status(404).json({message: "El usuario no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async login(req: Request, res: Response): Promise<any>{
        try{
            const { correo } = req.params;
            const { contrasenha } = req.params;
            const usuariosById = await pool.query('SELECT * FROM usuario WHERE correo = ? AND contrasenha = ?', [correo, contrasenha]);
            if(usuariosById.length > 0){
                return res.json(usuariosById[0]);
            }
            else{
                res.status(404).json({message: "El usuario no existe o la contrasenha no es la correcta"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async usuarioByCorreo(req: Request, res: Response): Promise<any>{
        try{
            const { correo } = req.params;
            const usuariosById = await pool.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
            if(usuariosById.length > 0){
                return res.json(usuariosById[0]);
            }
            else{
                res.status(404).json({message: "El usuario no existe o ha ingresado campos vacíos"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async createUsuario (req: Request, res: Response): Promise<void> {
        try{
            await pool.query('INSERT INTO usuario SET ?', [req.body]);
            res.json({message:'registro guardado con éxito'});
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async deleteUsuario (req: Request, res: Response): Promise<void>{
        try{
            const { id }= req.params;
            let statusQuery = await pool.query('DELETE FROM usuario WHERE idusuario = ?', [id]);
            if(statusQuery.affectedRows > 0){
                res.json({message: "El usuario fue eliminado con éxito"});
            }
            else{
                res.status(404).json({message: "El registro no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async updateUsuario(req: Request, res: Response): Promise< void>{
        try{
            const { id } = req.params;
            // console.log([req.body]);
            let statusQuery = await pool.query('UPDATE usuario SET ? WHERE idusuario = ?', [req.body, id]);
            if(statusQuery.affectedRows > 0){
                res.json({message: "El usuario fue actualizado con éxito"});
            }
            else{
                res.status(404).json({message: "El usuario editado no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async updateContrasenha(req: Request, res: Response): Promise< void>{
        try{
            const  idusuario = req.body.idusuario;
            const contrasenha = req.body.contrasenha;
            // console.log('mira', req.body, idusuario, contrasenha);
            let statusQuery = await pool.query('UPDATE usuario SET contrasenha = ? WHERE idusuario = ?', [contrasenha, idusuario]);
            if(statusQuery.affectedRows > 0){
                res.json({message: "La contraseña fue cambiada con éxito"});
            }
            else{
                res.status(404).json({message: "El usuario no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
}

const usuarioController = new UsuarioController();
export default usuarioController;