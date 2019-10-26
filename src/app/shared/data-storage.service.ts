import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService{

    constructor(private http: HttpClient,
                private recipeService: RecipeService){

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://angular-project-2664a.firebaseio.com/recipes.json', recipes).subscribe((response: any) => {
            console.log('Response', response);
        });
    }

    fetchRecipes(){
        this.http.get('https://angular-project-2664a.firebaseio.com/recipes.json').subscribe((recipes: Recipe[]) => {
           this.recipeService.setRecipes(recipes);
        });
    }
}