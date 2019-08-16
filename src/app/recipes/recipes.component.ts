import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipeElement: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeEmitter.subscribe((recipe: Recipe) => {
      this.recipeElement = recipe;
    });
  }

  receiveRecipeFromList(recipe: Recipe) {
    this.recipeElement = recipe;
  }
}
