import { Router } from 'express';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post('/categories', (request, response) => {
  const { name, descripton } = request.body;

  categories.push({
    name,
    descripton,
  });

  return response.status(201).json({ message: 'Created' });
});

export { categoriesRoutes };
