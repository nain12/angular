import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
 /*  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef; */
  @ViewChild('form') shoppingListForm: NgForm;
  shoppingListSubscription: Subscription;
  editMode= false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListSubscription = this.shoppingListService.startedEditing.subscribe((index:number) => {
       this.editMode = true;
       this.editedItemIndex = index;
       this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
       this.shoppingListForm.setValue({
         name: this.editedItem.name,
         amount: this.editedItem.amount
       })
    });
  }

  onAddItem(form: NgForm){
   /*  const ingName = this.nameInputRef.nativeElement.value;
    const ingAmt = this.amountInputRef.nativeElement.value;
    const ingredient = new Ingredient(ingName,ingAmt); */
   const value = form.value;
   const ingredient = new Ingredient(value.name,value.amount);
   
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.onAddIngredient(ingredient);
    }
   
   this.editMode = false;
   this.shoppingListForm.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.shoppingListSubscription.unsubscribe();
  }
}
