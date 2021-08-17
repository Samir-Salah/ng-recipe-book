import { RecipeEditComponentComponent } from './recipes/recipe-edit-component/recipe-edit-component.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponentComponent } from './recipes/first-component/first-component.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: FirstComponentComponent },
      { path: 'new', component: RecipeEditComponentComponent },
      { path: ':id', component: RecipeDetailComponent , resolve:[RecipeResolverService]},
      { path: ':id/edit', component: RecipeEditComponentComponent, resolve:[RecipeResolverService] },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
