import { Request,Response } from 'express'
import Usuario from '../models/usuario'

export const getUsuarios = async (req:Request ,res:Response) => {

    const usuarios = await Usuario.findAll();
    res.json({usuarios});
}

export const getUsuario = async(req:Request ,res:Response) => {

    const { id } = req.params;
    const usuarios = await Usuario.findByPk(id);

    if(usuarios){
        res.json(usuarios)
    }
    else{
        res.status(404).json({
            msg:`No existe un usuario con id ${id}`
        })
    }
}

export const postUsuarios =async (req:Request ,res:Response) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({

            where: { email : body.email }
        });

        if(existeEmail){
            return res.status(400).json({
               msg: 'ya existe usuario con el mail ' + body.email
            });
        }

        const usuario = Usuario.build(body);
        res.json(usuario);
      

        
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        });
    }
    
}

export const putUsuarios = async (req:Request ,res:Response) => {

    const { id } = req.params;
    const { body } = req;
    try {

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
               msg: 'usuario no existe  ' + id
            });
        }

        await usuario.update(body);


        
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        });
    }
}
export const deleteUsuarios = async (req:Request ,res:Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(404).json({
           msg: 'usuario no existe  ' + id
        });
    }
    //elimana de manera logica
    await usuario.update({estado:false});
    // borrar de manera fisica en Base de datos
   // await usuario.destroy();

    res.json(usuario)
}