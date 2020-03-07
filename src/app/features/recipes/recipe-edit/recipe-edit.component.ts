import { Recipe } from './../recipe.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  editMode = false;
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          this.recipeId = +params.get('id');
          this.editMode = params.get('id') != null;
        }
      );
      if(this.recipeId) {
        this.recipe = this.recipeService.getRecipe(this.recipeId);
      }
  }

}
