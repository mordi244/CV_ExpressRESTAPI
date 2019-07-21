import { Request, Response, NextFunction, Router } from 'express';
import { v1 as uuid } from 'uuid';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { fullCategoryArr, loadProductsCatsFile } from '../data';
import { myGetValidation } from '../middleware/routesValidations';
const categRouter = Router();

loadProductsCatsFile(); //load data


//Get all categories
categRouter.get("/", (req: Request, res: Response) => {
  res.send(fullCategoryArr);
});

//Get category with speciefic id
categRouter.get('/:id', myGetValidation, (req: Request, res: Response) => {
  const category = fullCategoryArr[res.locals.matchingIndex];
  res.send(category);
});

//Get all products for speciefic category
categRouter.get('/:id/products', myGetValidation, (req: Request, res: Response) => {
  const category: Category = fullCategoryArr[res.locals.matchingIndex];
  const prodList: Product[] = [];
  category.products.forEach((prod) => {
    prodList.push(prod);
  });
  res.send(prodList);
});

//Add new category
categRouter.post('/', (req: Request, res: Response) => {
  const categoryToAdd = req.body;
  categoryToAdd.id = uuid();
  const prodList: Product[] = [];
  categoryToAdd.products = prodList;
  fullCategoryArr.push(categoryToAdd);
  res.status(201).send(categoryToAdd);
});



//Update existing category
categRouter.put('/:id', myGetValidation, (req: Request, res: Response) => {
  const updated = req.body;
  fullCategoryArr.forEach(cat => {
    if (cat.id == req.params.id) {
      cat.name = updated.name ? updated.name : cat.name;
      res.send(cat);
    }
  });
});


//Delete category
categRouter.delete('/:id', myGetValidation, (req: Request, res: Response) => {
  let index = res.locals.matchingIndex;
  let category = fullCategoryArr[index];
  fullCategoryArr.splice(index, 1);
  res.status(204).send(category);
});

//exporting categories router and products array.
export { categRouter };




