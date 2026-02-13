import { Component } from '@angular/core';
import { Iproject } from '../../core/interface/iproject';
import { ProjectApiService } from '../../core/api/ProjectApiService';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  constructor(
    private _ProjectApiService: ProjectApiService,
    private _ActivatedRoute: ActivatedRoute

  ) {

  }
  id!: string
  project: Iproject = {} as Iproject
  ngOnInit(): void {
    this._ActivatedRoute.data.subscribe((data : any)=>{
      this.project = data['data']
      console.log(data);
    })

  }
  
}
