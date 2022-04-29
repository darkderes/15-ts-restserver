import { Router } from 'express';
import { deleteUsuarios, getUsuarios,getUsuario, postUsuarios, putUsuarios } from '../controller/usuarios';

const router = Router();

router.get('/'   ,   getUsuarios);
router.get('/:id',   getUsuario);
router.post('/',     postUsuarios);
router.put('/:id',   putUsuarios);
router.delete('/:id',deleteUsuarios);




export default router;