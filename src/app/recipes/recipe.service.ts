import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChangged = new Subject<Recipe[]>();
  recipeSelected = new EventEmitter<Recipe>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Cheese Burger',
  //     'It is a Classic cheeseburger!',
  //     'https://media.istockphoto.com/photos/hamburger-with-fries-picture-id617364554?k=6&m=617364554&s=612x612&w=0&h=BifDNyNdMMMPvE3q9MX3PmBPmmIfG_9v5jbarS7vHLo=',
  //     [
  //       new Ingredient('buns', 2),
  //       new Ingredient('meat', 1),
  //       new Ingredient('cheese slice', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Hot Dog Sandwich',
  //     'This recipe is favorite for both adults and kids.',
  //     'https://www.americangarden.us/wp-content/uploads/2016/10/Recipe_Hot-dog-sandwich.jpg',
  //     [new Ingredient('bread', 1), new Ingredient('hot dog', 1)]
  //   ),
  // ];
  private recipes: Recipe[]=[];
  constructor(
    private shoppinListService: ShoppingListService,
    private http: HttpClient
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChangged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getIngredientsOfSelectedRecipe(ingredients: Ingredient[]) {
    this.shoppinListService.addIngredientsFromRecipe(ingredients);
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChangged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChangged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChangged.next(this.recipes.slice());
  }
  storeRecipes() {
    const recipes = this.getRecipes();
    this.http
      .put(
        'https://ng-recipe-book-79a98-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-79a98-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),tap(recipes=>{
          this.setRecipes(recipes);
        })
      );
  }
}
