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
import { UplodeImgService } from '../../core/api/uplode-img.service';
import { FadeRightDirective } from "../../core/direcitve/fade-right.directive";

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
    private _ToastrService: ToastrService,
    private _router: Router,
    private _bg: BgService,
    private _uplodeImg: UplodeImgService,
  ) { }
  @Input({ required: true }) adminMode: boolean = false
  @Input({ required: true }) projcets: Iproject[] = [] as Iproject[]
  bg!: string
  ngAfterViewInit(): void {
    this._bg.$theme.subscribe({
      next: res => {
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
  typeSeletion : string[] =[ 'Financial Services Market' ,'Construction & Engineering Market','Fitness & Sports Market', 'Home Services Market' ,'Fashion & Apparel Market' ,'Pharma & Medical Distribution' ,'Kids & Toys Market','Security & Surveillance Market' ,'Automotive Market', 'Legal Services Market','Wholesale Market' , 'Real Estate Market' , 'Education Market' ,'Corporate & B2B Services' ,'Industrial Market' , 'Beauty & Cosmetics Market' , 'Tech & SaaS Market' , 'Food & Beverage Market' , ]
  @ViewChild('add_pro') add_pro_section!: ElementRef
  @ViewChild('btnSubmit') btnSubmit!: ElementRef
  add_project!: FormGroup
  project_title!: FormControl
  project_dis!: FormControl
  date_start !: FormControl
  date_end !: FormControl
  project_rate!: FormControl
  project_type!: FormControl
  project_poster!: FormControl
  roles!: FormArray
  role!: FormControl
  challenges!: FormArray
  challenge!: FormControl
  strategics!: FormArray
  strategic!: FormControl
  tools!: FormArray
  tool !: FormControl
  results!: FormArray
  view !: FormControl
  interaction !: FormControl
  Click !: FormControl
  visit_page !: FormControl
  New_follower !: FormControl
  project_media !: FormArray
  url!: FormControl
  dis!: FormControl
  isVideo!: FormControl
  recommendations  !: FormArray
  recommendation !: FormControl
  client_name !: FormControl

  eidtMode: boolean = false
  projectId !: number

  //! فتح ببرت اضافة مشروع
  open_add_pro() {
    this.add_pro_section.nativeElement.classList.add("show")
    this.add_pro_section.nativeElement.classList.remove("hidden")
    if (!this.eidtMode) {
      this.pushControls()
    }
  }
  //! غلق ببرت اضافة مشروع
  closing_add_pro() {
    this.add_pro_section.nativeElement.classList.add("hidden")
    this.add_pro_section.nativeElement.classList.remove("show")
    this.getProjects()
    this.eidtMode = false
    this.add_project.reset()
    this.clearControls()
    // this.pushControls()
  }
  initFormControlNewPro() {
    this.project_title = new FormControl('', [Validators.required, Validators.minLength(3)])
    this.project_dis = new FormControl('', [Validators.required, Validators.minLength(3)])
    this.project_rate = new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)])
    this.project_type = new FormControl('', [Validators.required])
    this.client_name = new FormControl('', [Validators.required])
    this.date_start = new FormControl('', [Validators.required])
    this.date_end = new FormControl('', [Validators.required])
    this.project_poster = new FormControl(this.imgsrc, [Validators.required])
    this.results = new FormArray([this.createResultsGroup()])
    this.tools = new FormArray([this.createTool()])
    this.roles = new FormArray([this.createRoles()])
    this.challenges = new FormArray([this.createchallenges()])
    this.strategics = new FormArray([this.createStrategic()])
    this.project_media = new FormArray([this.createMediaGroup()])
    this.recommendations = new FormArray([this.createRecommendation()])
  }
  initFormGroupNewPro() {
    this.add_project = new FormGroup({
      project_title: this.project_title,
      project_dis: this.project_dis,
      project_rate: this.project_rate,
      date_start: this.date_start,
      date_end: this.date_end,
      project_type: this.project_type,
      client_name: this.client_name,
      project_poster: this.project_poster,
      results: this.results,
      tools: this.tools,
      strategics: this.strategics,
      challenges: this.challenges,
      roles: this.roles,
      project_media: this.project_media,
      recommendations : this.recommendations ,
    })
  }
  //!Recommendations
    createRecommendation(value :string=''){
      return new FormGroup({
        recommendation : new FormControl(value , Validators.required)
      })
    }
    get recommendationsControls(){
      return this.add_project.get('recommendations') as FormArray
    }
    addRecommendation(){
      this.recommendationsControls.push(this.createRecommendation())
    }
  //!media
  createMediaGroup(dis: string = '', url: string = '', isVideo: boolean = false) {
    return new FormGroup({
      url: new FormControl(url, Validators.required),
      dis: new FormControl(dis, Validators.required),
      isVideo: new FormControl(isVideo, Validators.required),
    })
  }
  get mediaControls() {
    return this.add_project.get('project_media') as FormArray
  }
  addMedia() {
    this.mediaControls.push(this.createMediaGroup());
  }
  //& النتائج
  createResultsGroup(view: number = 0, inter: number = 0, click: number = 0, vist: number = 0, follower: number = 0) {
    return new FormGroup({
      view: new FormControl(view, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      interaction: new FormControl(inter, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      Click: new FormControl(click, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      visit_page: new FormControl(vist, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      New_follower: new FormControl(follower, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    })
  }
  get resultsControls() {
    return this.add_project.get('results') as FormArray
  }
  addResults() {
    this.resultsControls.push(this.createResultsGroup());
  }

  //& الادوات
  createTool(value: string = '') {
    return new FormGroup({
      tool: new FormControl(value, [Validators.required])
    })
  }
  get toolsControls() {
    return this.add_project.get('tools') as FormArray
  }
  addTools() {
    this.toolsControls.push(this.createTool())
  }
  //& الاستراتجيات
  createStrategic(value: string = '') {
    return new FormGroup({
      strategic: new FormControl(value, [Validators.required])
    })
  }
  get strategicControls() {
    return this.add_project.get('strategics') as FormArray
  }
  addStrategic() {
    this.strategicControls.push(this.createStrategic())
  }
  //& التحديات
  createchallenges(value: string = '') {
    return new FormGroup({
      challenge: new FormControl(value, [Validators.required])
    })
  }
  get challengeControls() {
    return this.add_project.get('challenges') as FormArray
  }
  addChallenge() {
    this.challengeControls.push(this.createchallenges())
  }
  //& الادوار
  createRoles(value: string = '') {
    return new FormGroup({
      role: new FormControl(value, [Validators.required])
    })
  }
  get rolesControls() {
    return this.add_project.get('roles') as FormArray
  }
  addRole() {
    this.rolesControls.push(this.createRoles())
  }


  clearControls() {
    this.mediaControls.clear();
    this.resultsControls.clear();
    this.challengeControls.clear();
    this.rolesControls.clear();
    this.strategicControls.clear();
    this.toolsControls.clear();
    this.recommendationsControls.clear()
  }
  pushControls() {
    this.mediaControls.push(this.createMediaGroup());
    this.resultsControls.push(this.createResultsGroup());
    this.challengeControls.push(this.createchallenges());
    this.rolesControls.push(this.createRoles());
    this.strategicControls.push(this.createStrategic());
    this.toolsControls.push(this.createTool());
    this.recommendationsControls.push(this.createRecommendation())
  }

  add_pro_sbumit() {
    if (this.add_project.valid) {
      this._ProjectApiService.addNewProject(this.add_project.value).subscribe({
        next: res => {
          this._ToastrService.success('Project added successfully.', 'Success')
          this.add_project.reset()
          this.clearControls()
          this.pushControls()
          this.getProjects()
        }
      })
    } else {
      this.add_project.markAllAsTouched()
      Object.keys(this.add_project.controls).forEach(key => {
        this.add_project.controls[key].markAsDirty()
      })
      console.log(this.add_project.value);
      this._ToastrService.error('Please fill in all required fields.', 'Error')
    }
  }
  //* التعديل علي مشروع
  enableEdit(id: number) {
    const project = this.projcets.find(pro => pro.id === id);
    if (!project) return;

    this.eidtMode = true;
    this.clearControls()
    console.log(this.toolsControls.length);
    this.projectId = project.id;
    this.imgsrc = project.project_poster;
    // إضافة القيم مباشرة
    // tools
    if (project.tools && project.tools.length) {
      project.tools.forEach(t => this.toolsControls.push(this.createTool(t.tool)));
    } else {
      this.toolsControls.push(this.createTool()); // اعمل واحد افتراضي لو مفيش tools
    }
    // Roles
    if (project.roles && project.roles.length) {
      project.roles.forEach(r => {
        this.rolesControls.push(this.createRoles(r.role));
      })
    } else {
      this.rolesControls.push(this.createRoles());
    }
    // Challenges
    if (project.challenges && project.challenges.length) {
      project.challenges.forEach(c => { this.challengeControls.push(this.createchallenges(c.challenge)); });
    } else {
      this.challengeControls.push(this.createchallenges());
    }

    // Strategics
    if (project.strategics && project.strategics.length) {
      project.strategics.forEach(s => {
        this.strategicControls.push(this.createStrategic(s.strategic));
      });
    } else {
      this.strategicControls.push(this.createStrategic());
    }
    //Recommendations
    if(project.recommendations && project.recommendations.length){
        project.recommendations.forEach(r=>{
          this.recommendationsControls.push(this.createRecommendation(r.recommendation))
        })
    }
    project.results.forEach(res => {
      this.resultsControls.push(this.createResultsGroup(res.view, res.interaction, res.Click, res.visit_page, res.New_follower));
    });

    project.project_media.forEach(m => {
      this.mediaControls.push(this.createMediaGroup(m.dis, m.url, m.isVideo));
    });

    // القيم العادية
    this.add_project.patchValue({
      project_title: project.project_title,
      project_dis: project.project_dis,
      project_rate: project.project_rate,
      project_type: project.project_type,
      client_name: project.client_name,
      project_poster: project.project_poster,
      date_end: project.date_end,
      date_start: project.date_start

    });
    this.open_add_pro(); // فتح قسم الإضافة/التعديل
  }
  //! حفظ التعديلات
  saveChanges() {
    if (this.add_project.valid) {
      this.eidtMode = false
      this._ProjectApiService.updataProject(this.projectId, this.add_project.value).subscribe({
        next: res => {
          this.add_project.reset()
          this.clearControls()
          this.pushControls()
          this.closing_add_pro()
          this._ToastrService.success('Project updated successfully.', 'Success ')
        },
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
  deleteProject(id: number) {
    this._ProjectApiService.deletProject(id).subscribe({
      next: res => {
        this._ToastrService.success('Project deleted successfully.', 'Success ')
        this.getProjects()
      }
    })
  }
  //! الحفظ بحالته
  onsubmit() {
    if (this.eidtMode) {
      this.saveChanges()
    } else {
      this.add_pro_sbumit()
    }

  }
  //! الذهاب الي صفحة تفاصيل المشروع
  detalisProject(id: number) {
    this._router.navigate(['project/details', id])
  }

  //! img
  imgsrc: string = ''
  uplodeImg(event: any) {
    let file = event.target.files[0]
    let formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'portfolio_upload')
    this._uplodeImg.uplodeImg(formData).subscribe({
      next: res => {
        this.imgsrc = res.secure_url
        this.add_project.get('project_poster')?.setValue(this.imgsrc)
      }
    })
  }
  uplodeImgMedia(event: any, index: number) {
    let file = event.target.files[0]
    let formDate = new FormData()
    formDate.append('file', file)
    formDate.append('upload_preset', "portfolio_upload")
    this._uplodeImg.uplodeImg(formDate).subscribe({
      next: res => {
        let img = res.secure_url
        this.mediaControls.at(index).get('url')?.setValue(img)
      },
      error: err => {
        this._ToastrService.error('error try agin anther time', '')
      }
    })
  }
  //!
  deleteFildes(ind: number, control: FormArray) {
    if (control.length > 1) {
      control.removeAt(ind)
      this._ToastrService.success('The item was successfully deleted', '')
    } else {
      this._ToastrService.warning('The last item cannot be deleted', '')
    }
  }

  //! لعمل ارقام
  rangeHalf(max: number): number[] {

    let totalNumbers = max * 2 + 1;

    return Array.from({ length: totalNumbers }, (value, index) => {
      return index / 2;
    });

  }

}
