import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipe.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit , OnDestroy {
  recipes: Recipe[] = [];
  subscription !:Subscription;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeService.fetchRecipes().subscribe();
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeChangged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes = recipes;
      }
    )
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
