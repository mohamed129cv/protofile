import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Injectable } from '@angular/core';
import { Iproject } from '../interface/iproject';
import { ChartConfiguration } from 'chart.js';

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,       // <-- هنا
  PointElement,      // <-- هنا
  ScatterController,

} from 'chart.js';
Chart.register(
  BarController, BarElement,
  CategoryScale, LinearScale,
  Legend, Title, Tooltip,
  DoughnutController, ArcElement,
  LineController, LineElement, PointElement,   // <-- ضروري للـ line
  ScatterController,
  ChartDataLabels
);

@Injectable({
  providedIn: 'root'
})

export class ChartsService {

  constructor() { }
  allDate(project: Iproject) {
    const data = {
      labels: ['Views', 'Interaction', 'Click', 'Visit Page', 'New Followers'],
      datasets: project.results.map((r, index) => ({
        label: `Stage  ${index + 1} results`,
        data: [
          Number(r.view),
          Number(r.interaction),
          Number(r.Click),
          Number(r.visit_page),
          Number(r.New_follower)
        ],
        backgroundColor:['rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)']
      }))
    };


    return this.barConfig(data)
  }
  viewsDatafun(project: Iproject) {
    const stages = project.results.map((_, i) => `Stage ${i + 1}`);
    const viewsData: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: stages,
        datasets: [{
          data: project.results.map(r => Number(r.view)),
          backgroundColor: stages.map(() => `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.7)`)
        }]
      },
      options: { responsive: true, plugins: { legend: { position: 'top' } } }
    };
    return viewsData
    // return this.doughnutConfig(viewsData)
  }
  interactionDatafun(project: Iproject) {
    const stages = project.results.map((_, i) => `Stage ${i + 1}`);
    const interactionData: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: stages,
        datasets: [{
          data: project.results.map(r => Number(r.interaction)),
          backgroundColor: stages.map(() => `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.6)`)
        }]
      },
      options: { responsive: true, plugins: { legend: { position: 'top' } } }
    };
    return interactionData
  }
  clickDataFun(project: Iproject) {
    const stages = project.results.map((_, i) => `Stage ${i + 1}`);
    const clickData: ChartConfiguration = {
      type: 'line',
      data: {
        labels: stages,
        datasets: [{
          label: 'Click',
          data: project.results.map(r => Number(r.Click)),
          borderColor: 'red',
          fill: false,
          tension: 0.3
        }]
      },
      options: { responsive: true }
    };
    return clickData
    // return this.lineConfig(clickData)
  }
  vistDataFun(project: Iproject) {
    const stages = project.results.map((_, i) => `Stage ${i + 1}`);
    const vistData: ChartConfiguration = {
      type: 'line',
      data: {
        labels: stages,
        datasets: [{
          label: 'Click',
          data: project.results.map(r => Number(r.Click)),
          borderColor: 'red',
          fill: false,
          tension: 0.4
        }]
      },
      options: { responsive: true }
    };
    return vistData
    // return this.lineConfig(clickData)
  }
  followersFun(project: Iproject) {
    const followerData: ChartConfiguration = {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'New Followers',
          data: project.results.map((r, i) => ({ x: i + 1, y: Number(r.New_follower) })),
          backgroundColor: 'orange'
        }]
      },
      options: { responsive: true, scales: { x: { title: { display: true, text: 'Stage' } }, y: { title: { display: true, text: 'Followers' } } } }
    };

    return followerData
    // return this.scatterConfig(followerData)
  }
  barConfig(data: any): ChartConfiguration<'bar'> {
    return {
      type: 'bar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          datalabels: {
            anchor: 'center',
            align: 'end',
            color: '#000',
            font: { weight: 'bold', size: 14 },
            formatter: (value) => value
          }
        },
        animation: { duration: 3000, easing: 'easeOutQuart', loop: true }
      },
      plugins: [ChartDataLabels]
    };
  }

  // 2️⃣ Doughnut Chart
  doughnutConfig(data: any): ChartConfiguration<'doughnut'> {
    return {
      type: 'doughnut',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          datalabels: {
            color: '#000',
            font: { weight: 'bold', size: 14 },
            formatter: (value) => value
          }
        }
      },
      plugins: [ChartDataLabels]
    };
  }

  // 3️⃣ Line Chart
 lineConfig(data: any): ChartConfiguration<'line'> {
  return {
    type: 'line',
    data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        datalabels: {
          color: '#000',
          font: { weight: 'bold', size: 12 },
          formatter: (value) => value // رقم مباشر لكل نقطة
        }
      },
      animation: { duration: 1000, easing: 'easeOutQuart' },
      elements: { line: { tension: 0.3 }, point: { radius: 5 } }
    },
    plugins: [ChartDataLabels]
  };
}


  // 4️⃣ Scatter Chart
 scatterConfig(data: any): ChartConfiguration<'scatter'> {
  return {
    type: 'scatter',
    data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        datalabels: {
          color: '#000',
          font: { weight: 'bold', size: 12 },
          formatter: (value: any) => value.y // لازم y لأنه object {x, y}
        }
      },
      scales: {
        x: { title: { display: true, text: 'Stage' } },
        y: { title: { display: true, text: 'Followers' } }
      }
    },
    plugins: [ChartDataLabels]
  };
}
}
