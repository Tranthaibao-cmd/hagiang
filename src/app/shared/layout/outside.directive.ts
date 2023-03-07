import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appOutside]',
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class OutsideDirective {
  @Output()
  clickedOutside = new EventEmitter<void>();
  constructor(private elementRef: ElementRef) {}
  onClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.clickedOutside.emit();
    }
  }
}
