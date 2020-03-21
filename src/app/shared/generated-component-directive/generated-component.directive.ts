import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGeneratedComponent]'
})
export class GeneratedComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}

}