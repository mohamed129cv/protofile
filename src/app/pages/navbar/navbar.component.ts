import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectApiService } from '../../core/api/ProjectApiService';
import { BgService } from '../../core/api/bg.service';
import { CommonModule } from '@angular/common';

// declare const autoTranslate: any
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private _ToastrService: ToastrService , private _bg:BgService) { }
  ngOnInit(): void {
      this.bg = this._bg.$theme.subscribe({
      next : res=>{
        console.log(res);
      }
    })
    if(localStorage.getItem('bg_protfile') =='dark'){
      document.body.classList.add('dark')
    }
  }
  pages: string[] = ['home', 'project', 'contact-us'];
  translateMode: boolean = localStorage.getItem('translateMode') === 'true';

  translatePage() {
   setTimeout(() => {
     const convey = (window as any).ConveyThis;
    if (!convey) {
      this._ToastrService.info('ConveyThis not loaded yet, please refresh', '');
      return;
    }
    this.translateMode = !this.translateMode;
    localStorage.setItem('translateMode', this.translateMode.toString());
    if (this.translateMode) {
      (window as any).ConveyThis.switchLanguage('ar');
    } else {
      (window as any).ConveyThis.switchLanguage('en')
    }
   }, 1000);
  }


    ngAfterViewInit(): void {
    // نتاكد ان السكريبت اتحمل
    const checkConvey = setInterval(() => {
      if ((window as any).ConveyThis) {
        clearInterval(checkConvey);
        // لو وضع الترجمة محفوظ من قبل
        if (this.translateMode) {
          (window as any).ConveyThis.switchLanguage('ar');
        } else {
          (window as any).ConveyThis.switchLanguage('en');
        }
      }
    }, 100);
  }

  bg !: any
  b(){
     if(this.bg == 'dark'){
      this.bg = 'light'
      document.body.classList.remove('dark')
    }else{
      this.bg = 'dark'
      // this._ProjectApiService
      document.body.classList.add('dark')
    }
    localStorage.setItem('bg_protfile',this.bg)
  }
  toggleBg(){
    this.bg = this._bg.$theme.subscribe({
      next : res=>{
        console.log(res);
      }
    })
    this._bg.toggleTheme()
  }

}

