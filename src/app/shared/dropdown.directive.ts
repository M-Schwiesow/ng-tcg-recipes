import { Directive, HostListener, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open')  isOpen = false;

  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  toggleOpen() {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}