import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFadeUp]',
  standalone: true
})
export class FadeUpDirective {

  constructor(private el :ElementRef) { }
  ngAfterViewInit(): void {
   
    const observable= new IntersectionObserver(entry=>{
      entry.forEach((e)=>{
       if (e.isIntersecting){
        e.target.classList.add('show')
      }else{
         e.target.classList.remove('show')
       }
      })
    } ,{threshold:0.1}
  )
    observable.observe(this.el.nativeElement);

  }
}
