import { Request, Response } from 'express';

import pool from '../database';

class CargosController{
    public async listCargos (req: Request, res: Response) {
        try{
            const cargos = await pool.query('SELECT * FROM cargo');
            res.json(cargos);
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
        }
    }
    public async cargoById(req: Request, res: Response): Promise<any>{
        try{
            const { id } = req.params;
            const cargosById = await pool.query('SELECT * FROM cargo WHERE idcargo = ?', [id]);
            if(cargosById.length > 0){
                return res.json(cargosById[0]);
            }
            else{
                res.status(404).json({message: "El cargo no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
        }
    }
    public async createCargo (req: Request, res: Response): Promise<void> {
        try{
            await pool.query('INSERT INTO cargo SET ?', [req.body]);
            res.json({message:'registro guardado con éxito'});
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
        }
    }

    public async deleteCargo (req: Request, res: Response): Promise<void>{
        const { id }= req.params;
        try{
            let statusQuery = await pool.query('DELETE FROM cargo WHERE idcargo = ?', [id]);
            if(statusQuery.affectedRows > 0){
                res.json({message: "El cargo fue eliminado con éxito"});
            }
            else{
                res.status(404).json({message: "El registro no existe"});
            }
        }
        catch(err){
            // console.log('mira aquiii', err);
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage }); // .send({ error: err, message: err.message })
        }
        
    }

    public async updateCargo(req: Request, res: Response): Promise< void>{
        try{
            const { id } = req.params;
        let statusQuery = await pool.query('UPDATE cargo SET ? WHERE idcargo = ?', [req.body, id]);
        if(statusQuery.affectedRows > 0){
            res.json({message: "El cargo fue actualizado con éxito"});
        }
        else{
            res.status(404).json({message: "El cargo editado no existe"});
        }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage }); // .send({ error: err, message: err.message })
        }
    }

}

const cargosController = new CargosController();
export default cargosController;