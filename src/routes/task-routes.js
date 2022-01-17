//import express from 'express';
import { Router } from 'express';
import * as taskCtrl from '../controllers/taksControllers';
// exporta todas las funciones como taskctrl

const router = Router();


router.post('/', taskCtrl.createTask );

router.get('/', taskCtrl.getAllTasks ); 
router.get('/done', taskCtrl.allDoneTaks ); // La de done la tuve que pone rarriba de la id porque si no lo tomaba como id entonces si no es sigue con el id
router.get('/:id', taskCtrl.findTaskById ); 

router.delete('/:id', taskCtrl.deleteTask );

router.put('/:id', taskCtrl.updateTask );


export default router; 