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
    private _uplodeImg: UplodeImgService) { }
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
  @ViewChild('add_pro') add_pro_section!: ElementRef
  @ViewChild('btnSubmit') btnSubmit!: ElementRef
  add_project!: FormGroup
  project_title!: FormControl
  project_dis!: FormControl
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

  eidtMode: boolean = false
  projectId !: number

  //! فتح ببرت اضافة مشروع
  open_add_pro() {
    this.add_pro_section.nativeElement.classList.add("show")
    this.add_pro_section.nativeElement.classList.remove("hidden")
  }
  //! غلق ببرت اضافة مشروع
  closing_add_pro() {
    this.add_pro_section.nativeElement.classList.add("hidden")
    this.add_pro_section.nativeElement.classList.remove("show")
    this.getProjects()
    this.eidtMode = false
    this.add_project.reset()
    this.mediaControls.clear()
    this.mediaControls.push(this.createMediaGroup())
  }
  initFormControlNewPro() {
    this.project_title = new FormControl('', [Validators.required, Validators.minLength(3)])
    this.project_dis = new FormControl('', [Validators.required, Validators.minLength(3)])
    this.project_rate = new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)])
    this.project_type = new FormControl('', [Validators.required])
    this.project_poster = new FormControl(this.imgsrc, [Validators.required])
    this.results = new FormArray([this.createResultsGroup()])
    this.tools = new FormArray([this.createTool()])
    this.roles = new FormArray([this.createRoles()])
    this.challenges = new FormArray([this.createchallenges()])
    this.strategics = new FormArray([this.createStrategic()])
    this.project_media = new FormArray([this.createMediaGroup()])
  }
  initFormGroupNewPro() {
    this.add_project = new FormGroup({
      project_title: this.project_title,
      project_dis: this.project_dis,
      project_rate: this.project_rate,
      project_type: this.project_type,
      project_poster: this.project_poster,
      results: this.results,
      tools: this.tools,
      strategics: this.strategics,
      challenges: this.challenges,
      roles: this.roles,
      project_media: this.project_media,
    })
  }
  createMediaGroup() {
    return new FormGroup({
      url: new FormControl('', Validators.required),
      dis: new FormControl('', Validators.required),
      isVideo: new FormControl(false, Validators.required),
    })
  }
  get mediaControls() {
    return this.add_project.get('project_media') as FormArray
  }
  addMedia() {
    this.mediaControls.push(this.createMediaGroup());
  }
  //& النتائج
  createResultsGroup() {
    return new FormGroup({
      view: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      interaction: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      Click: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      visit_page: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      New_follower: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    })
  }
  get resultsControls() {
    return this.add_project.get('results') as FormArray
  }
  addResults() {
    this.resultsControls.push(this.createResultsGroup());
  }

  //& الادوات
  createTool() {
    return new FormGroup({
      tool: new FormControl('', [Validators.required])
    })
  }
  get toolsControls() {
    return this.add_project.get('tools') as FormArray
  }
  addTools() {
    this.toolsControls.push(this.createTool())
  }
  //& الاستراتجيات
  createStrategic() {
    return new FormGroup({
      strategic: new FormControl('', [Validators.required])
    })
  }
  get strategicControls() {
    return this.add_project.get('strategics') as FormArray
  }
  addStrategic() {
    this.strategicControls.push(this.createStrategic())
  }
  //& التحديات
  createchallenges() {
    return new FormGroup({
      challenge: new FormControl('', [Validators.required])
    })
  }
  get challengeControls() {
    return this.add_project.get('challenges') as FormArray
  }
  addChallenge() {
    this.challengeControls.push(this.createchallenges())
  }
  //& الادوار
  createRoles() {
    return new FormGroup({
      role: new FormControl('', [Validators.required])
    })
  }
  get rolesControls() {
    return this.add_project.get('roles') as FormArray
  }
  addRole() {
    this.rolesControls.push(this.createRoles())
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
      Object.keys(this.add_project.controls).forEach(key => {
        this.add_project.controls[key].markAsDirty()
      })
      console.log(this.add_project.value);
      this._ToastrService.error('Please fill in all required fields.', 'Error')
    }
  }
  //* التعديل علي مشروع
  enableEdit(id: number) {
 this.open_add_pro(); // فتح قسم الإضافة/التعديل
  const project = this.projcets.find(pro => pro.id === id);
  if (!project) return;

  this.eidtMode = true;
  this.projectId = project.id;

  // مسح كل الـ FormArrays عشان نبدأ من جديد
  this.mediaControls.clear();
  this.resultsControls.clear();
  this.challengeControls.clear();
  this.rolesControls.clear();
  this.strategicControls.clear();
  this.toolsControls.clear();

  this.imgsrc = project.project_poster;

  // إضافة القيم مباشرة
 this.toolsControls.clear();
if (project.tools && project.tools.length) {
  project.tools.forEach(t => {
    this.toolsControls.push(new FormGroup({
      tool: new FormControl(t.tool || '', Validators.required)
    }));

  });
} else {
  console.log('object');
  this.toolsControls.push(this.createTool()); // اعمل واحد افتراضي لو مفيش tools
}

// Roles
this.rolesControls.clear();
if (project.roles && project.roles.length) {
  project.roles.forEach(r => {
    this.rolesControls.push(new FormGroup({
      role: new FormControl(r.role || '', Validators.required)
    }));
  });
} else {
  console.log('object');
  this.rolesControls.push(this.createRoles());
}

// Challenges
this.challengeControls.clear();
if (project.challenges && project.challenges.length) {
  project.challenges.forEach(c => {
    this.challengeControls.push(new FormGroup({
      challenge: new FormControl(c.challenge || '', Validators.required)
    }));
  });
} else {
  console.log('object');
  this.challengeControls.push(this.createchallenges());
}

// Strategics
this.strategicControls.clear();
if (project.strategics && project.strategics.length) {
  project.strategics.forEach(s => {
    this.strategicControls.push(new FormGroup({
      strategic: new FormControl(s.strategic || '', Validators.required)
    }));
  });
} else {
  this.strategicControls.push(this.createStrategic());
}

  project.results.forEach(res => {
    this.resultsControls.push(new FormGroup({
      view: new FormControl(Number(res.view), [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      visit_page: new FormControl(Number(res.visit_page), [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      interaction: new FormControl(Number(res.interaction), [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      Click: new FormControl(Number(res.Click) , [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      New_follower: new FormControl(Number(res.New_follower), [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    }));
  });

  project.project_media.forEach(m => {
    this.mediaControls.push(new FormGroup({
      url: new FormControl(m.url, Validators.required),
      dis: new FormControl(m.dis, Validators.required),
      isVideo: new FormControl(m.isVideo, Validators.required),
    }));
  });

  // القيم العادية
  this.add_project.patchValue({
    project_title: project.project_title,
    project_dis: project.project_dis,
    project_rate: project.project_rate,
    project_type: project.project_type,
    project_poster: project.project_poster
  });

  console.log('Form is ready for edit:', this.add_project.value);
  }
  //! حفظ التعديلات
  saveChanges() {
    if (this.add_project.valid) {
      this.eidtMode = false
      this._ProjectApiService.updataProject(this.projectId, this.add_project.value).subscribe({
        next: res => {
          this.add_project.reset()
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
        console.log(res);
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
        console.log(img);
        this.mediaControls.at(index).get('url')?.setValue(img)
      },
      error: err => {
        this._ToastrService.error('error try agin anther time', '')
      }
    })
  }
}
