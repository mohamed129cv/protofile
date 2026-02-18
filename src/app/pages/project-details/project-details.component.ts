import { Component, ElementRef, ViewChild } from '@angular/core';
import { Iproject } from '../../core/interface/iproject';
import { ProjectApiService } from '../../core/api/ProjectApiService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FadeUpDirective } from "../../core/direcitve/fade-up.directive";

import { BgService } from '../../core/api/bg.service';
import { ChartsService } from '../../core/api/charts.service';
import { Chart } from 'chart.js';
import { FadeRightDirective } from "../../core/direcitve/fade-right.directive";
import { FadeLeftDirective } from "../../core/direcitve/fade-left.directive";
import { Chart2Service } from '../../core/api/chart2.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';


@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, FadeUpDirective, FadeRightDirective, FadeLeftDirective, NgApexchartsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  constructor(
    private _ProjectApiService: ProjectApiService,
    private _ActivatedRoute: ActivatedRoute,
    private _bg: BgService,
    private _router: Router,
    private _chart: Chart2Service ,

  ) { }
  bg!: string
  id!: string
  project: Iproject = {} as Iproject
  ngOnInit(): void {
    this.id = String(this._ActivatedRoute.snapshot.paramMap.get('id'))
    this._ActivatedRoute.data.subscribe((data: any) => {
      this.project = data['data']
      this.viewsChartOptions = this._chart.viewsDataApex(this.project)
      this.clickChartOptions = this._chart.clickDataApex(this.project)
      this.followersChartOptions = this._chart.followersApex(this.project)
      this.interactionChartOptions = this._chart.interactionDataApex(this.project)
    })
    this.renderChart();
  }

  ngAfterViewInit() {
    this._bg.$theme.subscribe({
      next: res => {
        this.bg = res
      }
    })
  }
  chartOptions: ApexOptions = {};
   barChartOptions: ApexOptions = {};
  viewsChartOptions: ApexOptions = {};
  interactionChartOptions: ApexOptions = {};
  clickChartOptions: ApexOptions = {};
  visitChartOptions: ApexOptions = {};
  followersChartOptions: ApexOptions = {};
  renderChart() {
    if (!this.project.results || this.project.results.length === 0) return;
    this._chart.viewsDataApex(this.project)
    this._chart.clickDataApex(this.project)
    this._chart.followersApex(this.project)
    this._chart.interactionDataApex(this.project)
  }

  chartPage() {
    this._router.navigate(['project/analytics', this.id])
  }
    //! حساب المدة العمل في المشروع
  diffInMonths(start: Date | string, end: Date | string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    return months == 0 ? months + 1 : months
  }
}

