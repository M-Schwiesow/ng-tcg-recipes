import { map } from 'rxjs/operators';
import { Recipe } from './../recipe.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  recipeId: number;
  editMode = false;
  recipe: Recipe;
  recipeForm: FormGroup;
  private storeSub: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          this.recipeId = +params.get('id');
          this.editMode = params.get('id') != null;
          this.initForm();
        }
      );
  }

  ngOnDestroy() {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let recipeId = null;
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      this.storeSub = this.store.select('recipes').pipe(
        map(recipeState => recipeState.recipes.find(recipe => recipe.id === this.recipeId))
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = {
          ...recipe
        };
      });

      recipeId = this.recipe.id;
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if(this.recipe['ingredients']) {
        for (let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      // this looks unnecessarily difficult, however we're still generating our own ids
      'id': new FormControl(this.editMode ? recipeId : Math.floor(Math.random()*1000)),
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    let formValues = this.recipeForm.value;
    if(this.recipeForm.valid) {
      if(this.editMode) {
        this.recipe.name = formValues['name'];
        this.recipe.description = formValues['description'];
        this.recipe.imagePath = formValues['imagePath'];
        this.recipe.ingredients = formValues['ingredients'];
        // this.recipeService.updateRecipe(this.recipe);
        this.store.dispatch(new RecipeActions.UpdateRecipe(this.recipe));
      } else {
        /**
         * If our form's value property matches the format of our data model,
         * we can simply assign the value of the form directly to a new object
         * which is typed to our data model, like so:
         * let newRecipe: Recipe = this.recipeForm.value;
         * 
         * Does our ID field throw a wrench in that capability?  Yes, yes it does.
         */
        let newRecipe: Recipe = new Recipe(
          formValues['name'], 
          formValues['description'], 
          formValues['imagePath'], 
          formValues['ingredients']);
        this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
      }
    }
    this.router.navigate(['../']);

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
