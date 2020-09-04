import { Request, Response } from 'express';

import pool from '../database';

class ObrasController{
    public async list (req: Request, res: Response) {
        try{
            const obras = await pool.query('SELECT * FROM obra');
            res.json(obras);
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
        }
        
    }
    public async obraById(req: Request, res: Response): Promise<any>{
        try{
            const { id } = req.params;
            const obrasById = await pool.query('SELECT * FROM obra WHERE idobra = ?', [id]);
            if(obrasById.length > 0){
                return res.json(obrasById[0]);
            }
            else{
                res.status(404).json({message: "La obra no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
        }

        // res.json({text: 'este es una obra ' + req.params.id });
    }

    public async create (req: Request, res: Response): Promise<void> {
        try{
            await pool.query('INSERT INTO obra SET ?', [req.body]);
            res.json({message:'obra guardada con éxito'});
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage });
        }
    }

    public async deleteObra (req: Request, res: Response): Promise<void>{
        const { id }= req.params;
        try{
            const query = await pool.query('DELETE FROM obra WHERE idobra = ?', [id]);
            if(query.affectedRows > 0){
                res.json({message: "La obra fue eliminada correctamente"});
            }
            else{
                res.status(404).json({message:'La obra que intenta eliminar no existe, vuelva a revisar el registro'});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }

        // res.json('Eliminando obra ' + req.params.id);
    }

    public async update(req: Request, res: Response): Promise< void>{
        try{
            const { id } = req.params;
            await pool.query('UPDATE obra SET ? WHERE idobra = ?', [req.body, id]);
            res.json({message: "La obra fue actualizada correctamente"});
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
}

const obrasController = new ObrasController();
export default obrasController;