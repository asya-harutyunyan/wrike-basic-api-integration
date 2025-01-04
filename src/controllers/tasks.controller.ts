import fs from 'fs/promises';
import { Request, Response } from 'express';
import apiClient from '../api';
import { Task } from '../models/task.model';

export class TasksController {
  static async fetchTasks(req: Request, res: Response): Promise<void> {
    try {
      const { data } = await apiClient.get<Task[]>('/');
      const modifiedData = data.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        createdAt: task.createdDate,
        updatedAt: task.updatedDate,
        permalink: task.permalink,
      }));

      await fs.writeFile(
        'tasks.json',
        JSON.stringify(modifiedData, null, 2),
        'utf-8'
      );

      res.status(200).json(modifiedData);
    } catch (error: unknown) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }
}
