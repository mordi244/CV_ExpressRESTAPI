import { Request, Response, Router } from 'express';
import { v1 as uuid } from 'uuid';
import { productsArr } from '../data';
import { myProdGetValidation, myPostValidation } from '../middleware/routesValidations'

const prodRouter = Router();


//Get all products
prodRouter.get("/", (req: Request, res: Response) => {
  res.send(productsArr);
});

//Get product with speciefic id
prodRouter.get('/:id', myProdGetValidation, (req: Request, res: Response) => {
  const product = productsArr[res.locals.matchingIndex];
  res.send(product);
});

//Add new product
prodRouter.post('/', myPostValidation, (req: Request, res: Response) => {
  const productToAdd = res.locals.product;
  productToAdd.id = uuid();
  productsArr.push(productToAdd);
  res.status(201).send(productToAdd);
});

//Update existing product
prodRouter.put('/:id', myProdGetValidation, myPostValidation, (req: Request, res: Response) => {
  const updated = req.body;
  productsArr.forEach(prod => {
    if (prod.id == req.params.id) {
      prod.name = updated.name ? updated.name : prod.name;
      prod.itemInStock = updated.itemInStock ? updated.itemInStock : prod.itemInStock;
      res.send(prod);
    }
  });
});

//Delete product
prodRouter.delete('/:id', myProdGetValidation, (req: Request, res: Response) => {
  let index = res.locals.matchingIndex;
  let product = productsArr[index];
  if (index > -1) {
    productsArr.splice(index, 1);
  }
  res.status(204).send(product);
});


export { prodRouter };

