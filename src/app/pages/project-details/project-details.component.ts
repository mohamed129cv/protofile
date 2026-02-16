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


@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, FadeUpDirective, FadeRightDirective, FadeLeftDirective],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  constructor(
    private _ProjectApiService: ProjectApiService,
    private _ActivatedRoute: ActivatedRoute,
    private _bg: BgService,
    private _router: Router,
    private _chart: ChartsService
  ) { }
  bg!: string
  id!: string
  project: Iproject = {} as Iproject
  ngOnInit(): void {
    this.id = String(this._ActivatedRoute.snapshot.paramMap.get('id'))
    this._ActivatedRoute.data.subscribe((data: any) => {
      this.project = data['data']
      console.log(this.project.roles[0].role
      );
    })
  }

  ngAfterViewInit() {
    this.renderChart();
    this._bg.$theme.subscribe({
      next: res => {
        this.bg = res
      }
    })
  }
  chart!: Chart;
  @ViewChild('myChart' ,{ static: false }) myChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('view' ,{ static: false }) view!: ElementRef<HTMLCanvasElement>;
  @ViewChild('interaction' ,{ static: false }) interaction!: ElementRef<HTMLCanvasElement>;
  @ViewChild('click' ,{ static: false }) click!: ElementRef<HTMLCanvasElement>;
  @ViewChild('follower' ,{ static: false }) follower!: ElementRef<HTMLCanvasElement>;
  renderChart() {
    if (!this.project.results || this.project.results.length === 0) return;
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.view.nativeElement, this._chart.viewsDatafun(this.project));
    this.chart = new Chart(this.interaction.nativeElement, this._chart.interactionDatafun(this.project));
    this.chart = new Chart(this.click.nativeElement, this._chart.clickDataFun(this.project));
    this.chart = new Chart(this.follower.nativeElement, this._chart.followersFun(this.project));
  }

  chartPage() {
    this._router.navigate(['project/analytics', this.id])
  }
}

    // viewsDatafun() {
    //   const stages = this.project.results.map((_, i) => `Stage ${i + 1}`);
    //   const viewsData: ChartConfiguration = {
    //     type: 'doughnut',
    //     data: {
    //       labels: stages,
    //       datasets: [{
    //         data: this.project.results.map(r => Number(r.view)),
    //         backgroundColor: stages.map(() => `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.6)`)
    //       }]
    //     },
    //     options: { responsive: true, plugins: { legend: { position: 'top' } } }
    //   };
    //   return viewsData
    // }
    // interactionDatafun() {
    //   const stages = this.project.results.map((_, i) => `Stage ${i + 1}`);
    //   const interactionData: ChartConfiguration = {
    //     type: 'doughnut',
    //     data: {
    //       labels: stages,
    //       datasets: [{
    //         data: this.project.results.map(r => Number(r.interaction)),
    //         backgroundColor: stages.map(() => `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.6)`)
    //       }]
    //     },
    //     options: { responsive: true, plugins: { legend: { position: 'top' } } }
    //   };
    //   return interactionData
    // }
    // clickDataFun() {
    //   const stages = this.project.results.map((_, i) => `Stage ${i + 1}`);
    //   const clickData: ChartConfiguration = {
    //     type: 'line',
    //     data: {
    //       labels: stages,
    //       datasets: [{
    //         label: 'Click',
    //         data: this.project.results.map(r => Number(r.Click)),
    //         borderColor: 'red',
    //         fill: false,
    //         tension: 0.3
    //       }]
    //     },
    //     options: { responsive: true }
    //   };
    //   return clickData
    // }
    // followersFun() {
    //   const followerData: ChartConfiguration = {
    //     type: 'scatter',
    //     data: {
    //       datasets: [{
    //         label: 'New Followers',
    //         data: this.project.results.map((r, i) => ({ x: i + 1, y: Number(r.New_follower) })),
    //         backgroundColor: 'orange'
    //       }]
    //     },
    //     options: { responsive: true, scales: { x: { title: { display: true, text: 'Stage' } }, y: { title: { display: true, text: 'Followers' } } } }
    //   };
    //   return followerData
    // }
