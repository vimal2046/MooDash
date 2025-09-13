import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInvalidHighlight]' // usage: <input appInvalidHighlight>
})
export class InvalidHighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) {}

  ngOnInit() {
    // Listen to status changes of the form control
    this.control.statusChanges?.subscribe(status => {
      if (status === 'INVALID' && this.control.touched) {
        this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
        this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '6px');
      } else {
        this.renderer.removeStyle(this.el.nativeElement, 'border');
      }
    });
  }
}
