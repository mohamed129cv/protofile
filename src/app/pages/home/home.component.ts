import { Component, ElementRef, ViewChild } from '@angular/core';
import { FadeUpDirective } from "../../core/direcitve/fade-up.directive";
import { FadeRightDirective } from "../../core/direcitve/fade-right.directive";
import { FadeLeftDirective } from "../../core/direcitve/fade-left.directive";
import { ProjectsCartComponent } from '../projects-cart/projects-cart.component';
import { Iproject } from '../../core/interface/iproject';
import { ProjectApiService } from '../../core/api/ProjectApiService';
import { RouterLink } from '@angular/router';
import { BgService } from '../../core/api/bg.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FadeUpDirective, RouterLink, FadeRightDirective, FadeLeftDirective , ProjectsCartComponent ,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private _bg:BgService , private _ProjectApiService:ProjectApiService , private _BgService:BgService){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProjects()
    this._BgService.$theme.subscribe({
      next: res=>{
        this.bg = res
      }
    })
  }
   bg!: string
  scrollToAboutMe(){
    let aboutMeSection= document.getElementById('about_me')
    if(aboutMeSection){
      aboutMeSection.scrollIntoView({behavior:'smooth'})
    }
  }

  counts = {
    project :  0 ,
    client : 0 ,
    hours : 0 ,
    certificate : 0
  }
  targets= {
    project : 100 ,
    client : 20 ,
    hours : 200 ,
    certificate : 3
  }

  @ViewChild('achievement' ) achievementsContect!:ElementRef;
  ngAfterViewInit(){
    this.observ()
     this._bg.$theme.subscribe({
      next: res=>{
        this.bg = res
      }
    })
  }
  observ(){
    const observable = new IntersectionObserver(e=>{
      e.forEach((entry )=>{
        if(entry.isIntersecting){
          this.animateCounter('certificate')
          this.animateCounter('project')
          this.animateCounter('client')
          this.animateCounter('hours')
        }
      })
    })
    if(this.achievementsContect){
      observable.observe(this.achievementsContect.nativeElement)
    }
  }
  animateCounter(type : keyof typeof this.counts){
     let count= 0
    let target = this.targets[type]
     let speed = 10
      let interval = setInterval(()=>{
       if(count<target){
         count++
         this.counts[type]= count
       } else{
        clearInterval(interval)
       }
      } , speed)
  }

  projects:Iproject[] = []
  getProjects(){
    this._ProjectApiService.getAllProjects().subscribe({
      next:res=>{
        this.projects = res.slice(0,6)
      }
    })
  }
}
