import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFadeRight]',
  standalone: true
})
export class FadeRightDirective {

  constructor(private el :ElementRef) { }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const observable = new IntersectionObserver(entry=>{
      entry.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('show')
        }else{
          e.target.classList.remove('show')
        }
      })
    }
  , {threshold:.1})
    observable.observe(this.el.nativeElement)
}

}
