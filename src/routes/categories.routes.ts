import { Router } from 'express';
import { v4 as uuidV4 } from 'uuid';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post('/categories', (request, response) => {
  const { name, descripton } = request.body;

  const category = {
    id: uuidV4(),
    name,
    descripton,
  };
  categories.push(category);

  return response.status(201).json({ message: 'Created' });
});

export { categoriesRoutes };
