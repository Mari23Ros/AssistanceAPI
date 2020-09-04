import { Request, Response } from 'express';

import pool from '../database';

class UsuarioAsistenciaController{
    public async listUsuarioAsistencias (req: Request, res: Response) {
        try{
            const usuarioAsistencias = await pool.query('SELECT * FROM usuarioasistencia');
            res.json(usuarioAsistencias);
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async usuarioAsistenciaById(req: Request, res: Response): Promise<any>{
        try{
            const { idusuario } = req.params;
            const { idasistencia } = req.params;
            const usuariOAsistenciasById = await pool.query('SELECT * FROM usuarioasistencia WHERE usuario_idusuario = ? AND asistencia_idasistencia = ?', [idusuario, idasistencia]);
            if(usuariOAsistenciasById.length > 0){
                return res.json(usuariOAsistenciasById[0]);
            }
            else{
                res.status(404).json({message: "El registro no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async createUsuarioAsistencia (req: Request, res: Response): Promise<void> {
        try{
            await pool.query('INSERT INTO usuarioasistencia SET ?', [req.body]);
            res.json({message:'registro guardado con éxito'});
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async deleteUsuarioAsistencia (req: Request, res: Response): Promise<void>{
        try{
            const { idusuario }= req.params;
            const { idasistencia }= req.params;
            let statusQuery = await pool.query('DELETE FROM usuarioasistencia WHERE usuario_idusuario = ? AND asistencia_idasistencia', [idusuario, idasistencia]);
            if(statusQuery.affectedRows > 0){
                res.json({message: "El registro fue eliminado con éxito"});
            }
            else{
                res.status(404).json({message: "El registro no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async updateUsuarioAsistencia(req: Request, res: Response): Promise< void>{
        try{
            const { idusuario } = req.params;
            const { idasistencia } = req.params;
            let statusQuery = await pool.query('UPDATE usuarioasistencia SET ? WHERE idusuario = ? AND idasistencia = ?', [req.body, idusuario, idasistencia]);
            if(statusQuery.affectedRows > 0){
                res.json({message: "El registro fue actualizado con éxito"});
            }
            else{
                res.status(404).json({message: "El registro editado no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

}

const usuarioAsistenciasController = new UsuarioAsistenciaController();
export default usuarioAsistenciasController;