/* Load data from external json file */
import { Category } from './models/category';
import { Product } from './models/product';
import { v1 as uuid } from 'uuid';
const fs = require('fs'); //use fs for read data from file
const fullCategoryArr: Category[] = []; //full data about categoty - include products. 
const productsArr: Product[] = [];//all products

//load data from json file
const loadProductsCatsFile = () => {
  //read data from file
  let jsonObj = fs.readFileSync('data.json');
  let catObj = JSON.parse(jsonObj);

  for (let key in catObj.categories) { //loop over the categories
    if (catObj.categories.hasOwnProperty(key)) {
      catObj.categories[key].id = uuid(); //set id to category
      fullCategoryArr.push(catObj.categories[key]); //add category ti categories array
      for (let key2 in catObj.categories[key].products) { //loop over the products of category
        catObj.categories[key].products[key2].id = uuid(); //set id to product
        catObj.categories[key].products[key2].categoryId = catObj.categories[key].id; //set the foreign key of product's categoryId to id of category
        productsArr.push(catObj.categories[key].products[key2]); //add product to products array
      }
    }
  }
}

export { loadProductsCatsFile, fullCategoryArr, productsArr }