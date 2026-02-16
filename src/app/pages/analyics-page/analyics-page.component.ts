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
  imports: [CommonModule, FadeUpDirective],
  templateUrl: './analyics-page.component.html',
  styleUrl: './analyics-page.component.css'
})
export class AnalyicsPageComponent {
  constructor(private _bg:BgService, private _ActivatedRoute: ActivatedRoute, private _ChartsService: ChartsService) { }
  ngOnInit(): void {
    this._ActivatedRoute.data.subscribe((data: any) => {
      this.project = data['data']
      this.showChart('table')
    })
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
  bg!:string
  project: Iproject = {} as Iproject
  chart!: Chart;
  activeChart: string = 'table'
  @ViewChild('viewsCanvas') viewsCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('interactionsCanvas') interactionsCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('clicksCanvas') clicksCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('visitsCanvas') visitsCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('followersCanvas') followersCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('allChart') allChart!: ElementRef<HTMLCanvasElement>;
  showChart(chartName: string) {
    this.activeChart = chartName;
    if (this.chart) this.chart.destroy();
    setTimeout(()=>{
       switch (chartName) {
      case 'table':
        this.chart = new Chart(this.allChart.nativeElement, this._ChartsService.allDate(this.project));
        break;
      case 'views':
        this.chart = new Chart(this.viewsCanvas.nativeElement, this._ChartsService.viewsDatafun(this.project));
        break;
      case 'interactions':
        this.chart = new Chart(this.interactionsCanvas.nativeElement, this._ChartsService.interactionDatafun(this.project));
        break;
      case 'clicks':
        this.chart = new Chart(this.clicksCanvas.nativeElement, this._ChartsService.clickDataFun(this.project));
        break;
      case 'visits':
        this.chart = new Chart(this.visitsCanvas.nativeElement, this._ChartsService.vistDataFun(this.project));
        break;
      case 'followers':
        this.chart = new Chart(this.followersCanvas.nativeElement, this._ChartsService.followersFun(this.project));
        break;
      default:
        break;
    }
    },500)
  }
}

// getPercentageChange(index: number, field: string): number {
//   if (index === 0) return 0; // أول مرحلة مفيش قبلها حاجة

//   const previous = Number(this.project.results[index - 1][field]);
//   const current = Number(this.project.results[index][field]);
//   if (!previous) return 0;
//   return ((current - previous) / previous) * 100;
// }
