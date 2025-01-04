import express from 'express';
import { TasksController } from '../controllers/tasks.controller';

const router = express.Router();

router.get('/', TasksController.fetchTasks);

export default router;
