import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectsCartComponent } from '../projects-cart/projects-cart.component';
import { ProjectApiService } from '../../core/api/ProjectApiService';
import { Iproject } from '../../core/interface/iproject';
import { SearchPipe } from '../../core/pipe/search.pipe';
import { BgService } from '../../core/api/bg.service';
import { SeoService } from '../../core/api/seo.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, ProjectsCartComponent, SearchPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {
  constructor(private _seo : SeoService, private _ToastrService: ToastrService, private _ProjectApiService: ProjectApiService, private _bg: BgService) {
  }
  ngOnInit(): void {
    this.intiFormControl()
    this.intiFormGroup()
    this.getProjects()

    this._seo.updateMate(
      "A high-performance lead generation campaign using Facebook & Instagram Ads that increased qualified leads by 45% in 3 months.",
      "Lead Generation Campaign" ,
      "Lead Generation, Facebook Ads, Instagram Marketing, Conversion Rate, ROI, Performance Marketing ,Performance Marketing Expert, Meta Ads Specialist, Social Media Growth, Lead Generation Expert, Conversion Optimization"
    )
  }
  ngAfterViewInit(): void {
    this._bg.$theme.subscribe({
      next: res => {
        this.bg = res
      }
    })


  }
  typeMode: string = 'all'
  types : string[] = []
  bg!: string
  projects: Iproject[] = [] as Iproject[]
  allProjects: Iproject[] = [] as Iproject[]
  adminMode: boolean = true
  userName: string = 'admin'
  password: string = 'army4'
  searchWord: string = ''
  @ViewChild('loginSection') loginSection!: ElementRef
  @ViewChild('popert') popert!: ElementRef
  //! فتح ببرت تجيل الادمن
  login() {
    console.log(this.loginSection);
    this.loginSection.nativeElement.classList.add("show")
    this.loginSection.nativeElement.classList.remove("hidden")
  }
  closing() {
    this.loginSection.nativeElement.classList.add("hidden")
    this.loginSection.nativeElement.classList.remove("show")
    this.singUp.reset()
  }
  saveData() {
    this.adminMode = false
    this._ToastrService.success('Data Saved', 'Success')
  }
  singUp!: FormGroup
  user !: FormControl
  pass !: FormControl
  intiFormControl() {
    this.user = new FormControl('', [Validators.required])
    this.pass = new FormControl('', [Validators.required])
  }
  intiFormGroup() {
    this.singUp = new FormGroup({
      user: this.user, pass: this.pass
    })
  }
  submitLogin() {
    if (this.pass.value == this.password && this.user.value == this.userName) {
      this.adminMode = true
      this.closing()
      this._ToastrService.success('You have logged into admin mode. ', 'Success')

    } else {
      if (this.pass.value != this.password || this.user.value != this.userName) {
        this._ToastrService.error('Incorrect User Name and Password  ', 'Error')
      } else {
        this._ToastrService.error('Error', 'Error')
      }
    }
  }

  //* جلب المشاريع
  getProjects() {
    this._ProjectApiService.getAllProjects().subscribe({
      next: res => {
        this.projects = res
        this.allProjects = res
        this.types = Array.from(new Set(this.projects.map(pro=>pro.project_type.toLocaleLowerCase().trim())))
      }
    })
  }
  filterByType(type: string) {
    if (type.toLocaleLowerCase().trim() !== 'all') {
      this.projects =  this.allProjects.filter(prj => prj.project_type.toLocaleLowerCase().trim() == type.toLocaleLowerCase().trim())
    }
  }
  @ViewChild('passwordInput') passwordInput!:ElementRef
  showPassword :boolean = false
  toggleInputToPassword(){
    this.showPassword = !this.showPassword
  }
}
