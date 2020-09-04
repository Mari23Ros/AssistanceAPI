import { Request, Response } from 'express';

import pool from '../database';

class AsistenciaController{
    public async listAsistenciaSimple (req: Request, res: Response) {
        try{
            const cargos = await pool.query('SELECT * FROM asistencia');
            res.json(cargos);
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async listaAsistenciaVista (req: Request, res: Response) {
        try{
            const cargos = await pool.query(`SELECT
                                                asistencia.idasistencia AS idasistencia,
                                                usuarioasistencia.usuario_idusuario AS idusuario,
                                                usuario.nombre AS nombreUsuario,
                                                usuario.correo AS correoUsuario,
                                                usuario.rol AS rolUsuario,
                                                asistencia.fechaYHoraEntrada AS fechaYHoraEntrada,
                                                asistencia.fechaYHoraSalida AS fechaYHoraSalida,
                                                asistencia.trabajador_idtrabajador AS idtrabajador,
                                                trabajador.nombreTrabajador AS nombreTrabajador,
                                                trabajador.cargo_idcargo AS idcargo,
                                                cargo.nombreCargo AS nombreCargo,
                                                cargo.horasSemanalesAsignadas AS horasSemenalesAsignadas,
                                                cargo.remuneracionMensual AS remuneracionMensual,
                                                trabajador.obra_idobra AS idobra,
                                                obra.nombreObra AS nombreObra,
                                                obra.estado AS estado
                                            FROM 
                                                asistencia
                                            
                                            LEFT JOIN usuarioasistencia ON asistencia.idasistencia = usuarioasistencia.asistencia_idasistencia
                                            LEFT JOIN usuario ON usuarioasistencia.usuario_idusuario = usuario.idusuario
                                            LEFT JOIN trabajador ON asistencia.trabajador_idtrabajador = trabajador.idtrabajador
                                            LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                            LEFT JOIN obra ON trabajador.obra_idobra = obra.idobra
                                            `);
            res.json(cargos);
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async asistenciaPorRangoDeFecha(req: Request, res: Response){
        try{
            const { idobra } = req.params;
            const { fechaInicio } = req.params;
            const { fechaFin } = req.params;
            const asistencias = await pool.query(`SELECT
                                                    asistencia.idasistencia,
                                                    asistencia.trabajador_idtrabajador AS trabajador_idtrabajador,
                                                    trabajador.nombreTrabajador AS nombreTrabajador,
                                                    trabajador.obra_idobra AS obra_idobra,
                                                    trabajador.cargo_idcargo AS cargo_idcargo,
                                                    cargo.nombreCargo AS nombreCargo,
                                                    cargo.horasSemanalesAsignadas AS horasSemanalesAsignadas,
                                                    cargo.remuneracionMensual AS remuneracionMensual,
                                                    asistencia.fechaYHoraEntrada AS fechaYHoraEntrada,
                                                    asistencia.fechaYHoraSalida AS fechaYHoraSalida
                                                FROM
                                                    asistencia
                                                LEFT JOIN trabajador ON asistencia.trabajador_idtrabajador = trabajador.idtrabajador
                                                LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                                WHERE
                                                    trabajador.obra_idobra = ? && fechaYHoraEntrada BETWEEN ?
                                                AND ?`, [idobra, fechaInicio, fechaFin]);
            res.json(asistencias);
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async asistenciaPorTrabajador(req: Request, res: Response){
        try{
            const { idtrabajador } = req.params;
            const { fechaInicio } = req.params;
            const { fechaFin } = req.params;
            const asistencias = await pool.query(`SELECT
                                                    asistencia.idasistencia,
                                                    asistencia.trabajador_idtrabajador AS trabajador_idtrabajador,
                                                    trabajador.nombreTrabajador AS nombreTrabajador,
                                                    trabajador.obra_idobra AS obra_idobra,
                                                    trabajador.cargo_idcargo AS cargo_idcargo,
                                                    cargo.nombreCargo AS nombreCargo,
                                                    cargo.horasSemanalesAsignadas AS horasSemanalesAsignadas,
                                                    cargo.remuneracionMensual AS remuneracionMensual,
                                                    asistencia.fechaYHoraEntrada AS fechaYHoraEntrada,
                                                    asistencia.fechaYHoraSalida AS fechaYHoraSalida
                                                FROM
                                                    asistencia
                                                LEFT JOIN trabajador ON asistencia.trabajador_idtrabajador = trabajador.idtrabajador
                                                LEFT JOIN cargo ON trabajador.cargo_idcargo = cargo.idcargo
                                                WHERE
                                                    trabajador.idtrabajador = ? && fechaYHoraEntrada BETWEEN ?
                                                AND ?`, [idtrabajador, fechaInicio, fechaFin]);
            res.json(asistencias);
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async asistenciaById(req: Request, res: Response): Promise<any>{
        try{
            const { id } = req.params;
            const asistenciasById = await pool.query('SELECT * FROM asistencia WHERE idasistencia = ?', [id]);
            if(asistenciasById.length > 0){
                return res.json(asistenciasById[0]);
            }
            else{
                res.status(404).json({message: "El registro no existe"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }
    public async createAsistencia (req: Request, res: Response): Promise<void> {
        try{
            await pool.query('INSERT INTO asistencia SET ?', [req.body]);
            res.json({message:'registro guardado con éxito'});
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }

    public async deleteAsistencia (req: Request, res: Response): Promise<void>{
        try{
            const { id }= req.params;
        let statusQuery = await pool.query('DELETE FROM asistencia WHERE idasistencia = ?', [id]);
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

    public async updateAsistencia(req: Request, res: Response): Promise< void>{
        try{
            const { id } = req.params;
            let statusQuery = await pool.query('UPDATE asistencia SET ? WHERE idasistencia = ?', [req.body, id]);
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

    public async updateSalida(req: Request, res: Response): Promise<void>{
        try{
            const { idasistencia } = req.params;
            const { fechaSalida } = req.params;
            
            let statusQuery = await pool.query( 'UPDATE asistencia SET asistencia.fechaYHoraSalida = ? WHERE idasistencia = ?', [fechaSalida, idasistencia]);
            if(statusQuery.affectedRows > 0){
                res.json({message: "Salida registrada correctamente"});
            }
            else{
                res.status(404).json({message: "No se pudo registrar la salida"});
            }
        }
        catch(err){
            res.status(500).json({message: 'INTERNAL_SERVER_ERROR', messageError: err.sqlMessage })
        }
    }


}

const asistenciaController = new AsistenciaController();
export default asistenciaController;