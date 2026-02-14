import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Component, ElementRef, HostListener, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BgService } from './core/api/bg.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , NavbarComponent , FooterComponent , NgxSpinnerModule , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private _bg:BgService, private _NgxSpinnerService:NgxSpinnerService){}
  title = 'protofile';
  @ViewChild('goToUp')goToUp!:ElementRef
  @HostListener('window:scroll' , []) onSc(){
    if(window.scrollY > 300){
        this.goToUp.nativeElement.classList.add('show')
        this.goToUp.nativeElement.classList.remove('hidden')
      }else{
        this.goToUp.nativeElement.classList.add('hidden')
        this.goToUp.nativeElement.classList.remove('show')
    }
  }
  btnGoTop(){
    window.scrollTo({
      top:0 ,
      behavior: 'smooth',
    })
  }
  bg !:string
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this._bg.$theme.subscribe({
      next: res=>{
        this.bg = res
      }
    })
  }
}
