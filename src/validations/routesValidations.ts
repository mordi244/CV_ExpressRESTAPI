/* Validation functions for category and product routes */
import { Product } from '../models/product'
import { Request, Response, NextFunction } from 'express';
import { productsArr, fullCategoryArr } from '../data';
const idNumOfChars = 36;
const nameMinNumOfChars = 3;

/* -------------------Category Validations--------------- */

//Validate if category exist and id length
function myGetValidation(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const matching = fullCategoryArr.find(o => o.id === id);
  //category do not exists
  if (!matching) {
    res.sendStatus(404);
    return;
  }
  //category id is not 36
  if (id.length != idNumOfChars) {
    res.sendStatus(400);
    return;
  }
  //store the correct index of the element in res.locals
  res.locals.matchingIndex = fullCategoryArr.findIndex(o => o.id === id);
  next();
}

/* -------------------Product Validations--------------- */

//Validate if products exist and id length
function myProdGetValidation(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const matching = productsArr.find(o => o.id === id);
  //product not found
  if (!matching) {
    res.sendStatus(404);
    return;
  }
  //product id is not at length 36
  if (id.length != idNumOfChars) {
    res.sendStatus(400);
    return;
  }
  //store the correct index of the element in res.locals
  res.locals.matchingIndex = productsArr.findIndex(o => o.id === id);
  next();
}

//Validate length of name
function myPostValidation(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;
  if (product.name.length < nameMinNumOfChars) {
    res.sendStatus(409);
    return;
  }
  res.locals.product = product;
  next();
}

export { myGetValidation, myPostValidation, myProdGetValidation };




