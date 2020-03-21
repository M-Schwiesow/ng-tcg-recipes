import { CommonModule } from '@angular/common';
import { GeneratedComponentDirective } from './generated-component-directive/generated-component.directive';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    GeneratedComponentDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    GeneratedComponentDirective,
    CommonModule
  ],
  /**
  * Angular <= 8 requires the entryComponents property for creating Components programmatically
  * Angular 9+ does not require the below property
  */
 entryComponents: [
   AlertComponent,
 ]
})
export class SharedModule {}