import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Iproject } from '../../core/interface/iproject';
import { ProjectApiService } from '../../core/api/ProjectApiService';
import { ProjectDisPipe } from '../../core/pipe/project-dis.pipe';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FadeUpDirective } from "../../core/direcitve/fade-up.directive";
import { BgService } from '../../core/api/bg.service';

@Component({
  selector: 'app-projects-cart',
  standalone: true,
  imports: [CommonModule, ProjectDisPipe, ReactiveFormsModule, FadeUpDirective],
  templateUrl: './projects-cart.component.html',
  styleUrl: './projects-cart.component.css'
})
export class ProjectsCartComponent {
  constructor(
    private _ProjectApiService: ProjectApiService,
    private _ToastrService: ToastrService ,
  private _router: Router ,
private _bg : BgService) { }
  @Input({ required: true }) adminMode: boolean = false
  @Input({ required: true }) projcets: Iproject[] = [] as Iproject[]
  bg!: string
   ngAfterViewInit(): void {
    this._bg.$theme.subscribe({
      next: res=>{
        this.bg = res
      }
    })
  }
  ngOnInit(): void {
    this.initFormControlNewPro()
    this.initFormGroupNewPro()
  }
    //* جلب المشاريع
  getProjects() {
    this._ProjectApiService.getAllProjects().subscribe({
      next: res => {
        this.projcets = res
      }
    })
  }
  //* اضافة مشروع
  @ViewChild('add_pro') add_pro_section!: ElementRef
  @ViewChild('btnSubmit') btnSubmit!: ElementRef
  add_project!: FormGroup
  project_title!: FormControl
  project_dis!: FormControl
  project_rate!: FormControl
  project_type!: FormControl
  project_details!: FormControl
  project_image!: FormControl
  project_media !:FormArray
  url!: FormControl
  dis!: FormControl
  isVideo!: FormControl

  eidtMode:boolean = false
  projectId !: number

  //! فتح ببرت اضافة مشروع
  open_add_pro() {
    this.add_pro_section.nativeElement.classList.add("show")
    this.add_pro_section.nativeElement.classList.remove("hidden")
    this.mediaControls.push(this.createMediaGroup())
  }

  //! غلق ببرت اضافة مشروع
  closing_add_pro() {
    this.add_pro_section.nativeElement.classList.add("hidden")
    this.add_pro_section.nativeElement.classList.remove("show")
    this.getProjects()
    this.eidtMode = false
    this.add_project.reset()
    this.mediaControls.clear()
    // this.mediaControls.push(this.createMediaGroup())
  }

  initFormControlNewPro() {
    this.project_title = new FormControl('', [Validators.required , Validators.minLength(3)])
    this.project_dis = new FormControl('', [Validators.required , Validators.minLength(3)])
    this.project_rate = new FormControl('', [Validators.required , Validators.min(1) , Validators.max(10)])
    this.project_type = new FormControl('', [Validators.required])
    this.project_details = new FormControl('', [Validators.required])
    this.project_image = new FormControl('', [Validators.required])

  }
  initFormGroupNewPro() {
    this.add_project = new FormGroup({
      project_title: this.project_title,
      project_dis: this.project_dis,
      project_rate: this.project_rate,
      project_type: this.project_type,
      project_details: this.project_details,
      project_image: this.project_image ,
      project_media: this.project_media = new FormArray([
        this.createMediaGroup()
      ])
    })
  }
  createMediaGroup(){
    return new FormGroup ({
      url : new FormControl('' , Validators.required) ,
      dis : new FormControl('' , Validators.required) ,
      isVideo : new FormControl(false, Validators.required) ,
    })
  }
  get mediaControls(){
    return this.add_project.get('project_media') as FormArray
  }
  addMedia() {
  this.mediaControls.push(this.createMediaGroup());
}
  add_pro_sbumit() {
    if (this.add_project.valid) {
      this._ProjectApiService.addNewProject(this.add_project.value).subscribe({
        next: res => {
          this._ToastrService.success('Project added successfully.', 'Success')
          this.add_project.reset()
          this.getProjects()
        }
      })
    } else {
      this.add_project.markAllAsTouched()
      Object.keys(this.add_project.controls).forEach(key=>{
        this.add_project.controls[key].markAsDirty()
      })
      this._ToastrService.error('Please fill in all required fields.', 'Error')
    }
  }
  //* التعديل علي مشروع
  enableEdit(id: number) {
    this.open_add_pro()
    let project = this.projcets.find(pro => pro.id ===id)
  if (!project) return;
      this.eidtMode = true
      this.projectId = project.id
      this.project_title.setValue(project.project_title)
      this.project_dis.setValue(project.project_dis)
      this.project_image.setValue(project.project_image)
      this.project_rate.setValue(project.project_rate)
      this.project_type.setValue(project.project_type)
      this.project_details.setValue(project.project_details)

      project.project_media.forEach(m=>{
      this.mediaControls.push(new FormGroup({
        url : new FormControl(m.url , Validators.required) ,
        dis : new FormControl(m.dis , Validators.required) ,
        isVideo : new FormControl(m.isVideo, Validators.required) ,
      }))
    })

  }
  //! حفظ التعديلات
  saveChanges( ) {
    if(this.add_project.valid){
      this.eidtMode = false
      this._ProjectApiService.updataProject(this.projectId , this.add_project.value).subscribe({
        next: res =>{
          this.add_project.reset()
          this._ToastrService.success('Project updated successfully.', 'Success ')
        } ,
         error: () => {
        this._ToastrService.error(
          'Failed to update project',
          'Error'
        );
      }
      })
    }
  }

  //* حذف مشروع
  deleteProject(id:number){
    this._ProjectApiService.deletProject(id).subscribe({
      next:res=>{
        this._ToastrService.success('Project deleted successfully.', 'Success ')
        this.getProjects()

      }
    })
  }
  //! الحفظ بحالته
  onsubmit() {
    if(this.eidtMode){
      this.saveChanges()
    }else{
      this.add_pro_sbumit()
    }

  }
  //! الذهاب الي صفحة تفاصيل المشروع
  detalisProject(id:number){
      this._router.navigate(['project/details' , id])
  }
}
