import { Request, Response } from 'express';

import pool from '../database';

class TrabajadorController{
    public async listaTrabajadores (req: Request, res: Response) {
        try{
            const trabajadores = await pool.query('SELECT * FROM trabajador');
            res.json(trabajadores);
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async listaTrabajadoresPorObra (req: Request, res: Response) {
        console.log('prueba', req.params.idobra);
        try{
            const { idobra } = req.params; 
            const trabajadores = await pool.query(`SELECT
                                                        trabajador.idtrabajador AS idtrabajador,
                                                        trabajador.nombreTrabajador AS nombreTrabajador,
                                                        trabajador.dni AS dni,
                                                        trabajador.obra_idobra AS obra_idobra,
                                                        trabajador.telefono AS telefono,
                                                        trabajador.cargo_idcargo AS cargo_idcargo,
                                                        cargo.nombreCargo AS nombreCargo
                                                    FROM
                                                        trabajador
                                                    LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                                    WHERE
                                                        trabajador.obra_idobra = ?`,[idobra]);
            if(trabajadores.length > 0){
                return res.json(trabajadores);
            }
            else{
                res.status(404).json({message: "No hay ningún trabajador asignado a esta obra"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async trabajadorById(req: Request, res: Response): Promise<any>{
        try{
            const { id } = req.params;
            const trabajadoresById = await pool.query(`SELECT
                                                            trabajador.idtrabajador AS idtrabajador,
                                                            trabajador.nombreTrabajador AS nombreTrabajador,
                                                            trabajador.dni AS dni,
                                                            trabajador.obra_idobra AS obra_idobra,
                                                            trabajador.telefono AS telefono,
                                                            trabajador.cargo_idcargo AS cargo_idcargo,
                                                            cargo.nombreCargo AS nombreCargo
                                                        FROM
                                                            trabajador
                                                        LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                                        WHERE
                                                            trabajador.idtrabajador = ?`, [id]);
            if(trabajadoresById.length > 0){
                return res.json(trabajadoresById[0]);
            }
            else{
                res.status(404).json({message: "El trabajador no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async createTrabajador (req: Request, res: Response): Promise<void> {
        try{
            await pool.query('INSERT INTO trabajador SET ?', [req.body]);
            res.json({message:'registro guardado con éxito'});
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async deleteTrabajador (req: Request, res: Response): Promise<void>{
        try{
            const { id }= req.params;
            let statusQuery = await pool.query('DELETE FROM trabajador WHERE idtrabajador = ?', [id]);
            if(statusQuery.affectedRows > 0){
                res.json({message: "El trabajador fue eliminado con éxito"});
            }
            else{
                res.status(404).json({message: "El registro no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async updateTrabajador(req: Request, res: Response): Promise< void>{
        try{
            const { id } = req.params;
            let statusQuery = await pool.query('UPDATE trabajador SET ? WHERE idtrabajador = ?', [req.body, id]);
            if(statusQuery.affectedRows > 0){
                res.json({message: "El trabajador fue actualizado con éxito"});
            }
            else{
                res.status(404).json({message: "El trabajador editado no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

}

const trabajadorController = new TrabajadorController();
export default trabajadorController;