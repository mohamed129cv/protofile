import { ApexOptions } from './../../../../node_modules/ng-apexcharts/lib/model/apex-types.d';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Chart2Service } from './../../core/api/chart2.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproject } from '../../core/interface/iproject';
import { ChartsService } from '../../core/api/charts.service';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FadeUpDirective } from "../../core/direcitve/fade-up.directive";
import { BgService } from '../../core/api/bg.service';


@Component({
  selector: 'app-analyics-page',
  standalone: true,
  imports: [CommonModule, FadeUpDirective, NgApexchartsModule],
  templateUrl: './analyics-page.component.html',
  styleUrl: './analyics-page.component.css'
})
export class AnalyicsPageComponent {
  constructor(private Chart2Service: Chart2Service, private _bg: BgService, private _ActivatedRoute: ActivatedRoute, private _ChartsService: ChartsService) { }
  ngOnInit(): void {
    this._ActivatedRoute.data.subscribe((data: any) => {
      this.project = data['data']
      this.updateChart('bar')
    })

    this.barChartOptions = this.Chart2Service.allDateApex(this.project) ?? {};
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this._bg.$theme.subscribe({
      next: res => {
        this.bg = res
      }
    })

  }
  bg!: string
  project: Iproject = {} as Iproject
  chart!: Chart;
  activeChart: string = 'bar'

  chartOptions: ApexOptions = {};
  barChartOptions: ApexOptions = {};
  viewsChartOptions: ApexOptions = {};
  interactionChartOptions: ApexOptions = {};
  clickChartOptions: ApexOptions = {};
  visitChartOptions: ApexOptions = {};
  followersChartOptions: ApexOptions = {};


  updateChart(chartName: string) {
    this.activeChart = chartName;

    switch (chartName) {
      case 'bar':
        this.chartOptions = this.Chart2Service.allDateApex(this.project);
        break;
      case 'views':
        this.chartOptions = this.Chart2Service.viewsDataApex(this.project);
        break;
      case 'interactions':
        this.chartOptions = this.Chart2Service.interactionDataApex(this.project);
        break;
      case 'clicks':
        this.chartOptions = this.Chart2Service.clickDataApex(this.project);
        break;
      case 'visits':
        this.chartOptions = this.Chart2Service.vistDataApex(this.project);
        break;
      case 'followers':
        this.chartOptions = this.Chart2Service.followersApex(this.project);
        break;
    }
  }
}
