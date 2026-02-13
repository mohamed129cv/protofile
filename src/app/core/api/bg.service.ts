import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BgService {

  constructor() { }
     private theme = new BehaviorSubject<string>(localStorage.getItem('bg_protfile')||'lgiht')
     $theme = this.theme.asObservable()

    toggleTheme(){
      let newTheme = this.theme.value === 'dark' ? 'light':'dark'
      this.setTheme(newTheme)
      this.applyTheme(newTheme)
    }
    private setTheme(theme:string){
      localStorage.setItem('bg_protfile' , theme)
      this.theme.next(theme)
    }

    private applyTheme(theme: string) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }
}
