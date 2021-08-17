import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
  }
  onSaveData(){
    this.recipeService.storeRecipes();
    alert("All data is saved successfully :)")
  }

  onFetchData(){
    this.recipeService.fetchRecipes().subscribe();
  }
}
