import { Injectable } from '@angular/core';
import { Iproject } from '../interface/iproject';
import { ApexAxisChartSeries, ApexOptions } from 'ng-apexcharts';

@Injectable({
  providedIn: 'root'
})
export class Chart2Service {

  constructor() { }

  allDateApex(project: Iproject): ApexOptions {
    const series: ApexAxisChartSeries = project.results?.map((r, i) => ({
      name: i === 0
        ? 'Before 3 Months'
        : `After ${i * 3} Months`,
      data: [
        Number(r.view || 0),
        Number(r.interaction || 0),
        Number(r.Click || 0),
        Number(r.visit_page || 0),
        Number(r.New_follower || 0)
      ]
    })) || [];

    return {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: true },
        animations: { enabled: true, easing: 'easeout', speed: 800 }
      },
      series, // مهم جدا
      xaxis: { categories: ['Views', 'Interaction', 'Click', 'Visit Page', 'New Followers'] },
      yaxis: { title: { text: 'Count' } },
      colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
      dataLabels: { enabled: true },
      stroke: { show: true, width: 2 }, // ازالة 'transparent' لأنه غير مدعوم
      plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
      fill: { opacity: 0.85 },
      tooltip: { y: { formatter: (val: number) => val.toString() } }
    };
  }

  viewsDataApex(project: Iproject): ApexOptions {
    const stages = project?.results?.map((_, i) =>
      i === 0
        ? 'Before 3 Months'
        : `After ${i * 3} Months`
    ) || [];
    const dataSeries = project?.results?.map(r => Number(r.view || 0)) || [];

    return {
      chart: {
        type: 'donut' as const,
        height: 350
      }, title: {
        text: 'Views Distribution by Stage',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333'
        }
      },
      series: dataSeries,
      labels: stages,
      colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#00bfff', '#ff6347', '#32cd32', '#ff4500', '#8a2be2'],
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 50, 100]
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => (val.toFixed(1)).toString(),
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          colors: ['#a1a1']
        }
      },
      legend: {
        position: 'top',
        formatter: (label, opts) => `${label}: ${opts.w.globals.series[opts.seriesIndex]}`
      },
      tooltip: {
        y: {
          formatter: (val: number) => val.toString()
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { height: 300 },
            legend: { position: 'bottom' }
          }
        }
      ]
    };
  }

  interactionDataApex(project: Iproject): ApexOptions {
    const results = project?.results || [];
    const stages = results.map((_, i) =>
      i === 0 ? 'Before 3 Months' : `After ${i * 3} Months`
    );
    const seriesData = results.map(r => Number(r.interaction || 0));
    const colors = ['#00E396', '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']

    return {
      chart: {
        type: 'bar',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeout',
          speed: 800
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 6,
          dataLabels: {
            position: 'top' // تظهر القيم أعلى كل شريط
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => val.toString(),
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#fff']
        }
      },
      series: [{
        name: 'Interactions',
        data: seriesData
      }],
      xaxis: {
        categories: stages
      },
      colors: seriesData.map((_, i) => colors[i % colors.length]),
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          gradientToColors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
          shadeIntensity: 0.5,
          opacityFrom: 0.8,
          opacityTo: 0.9,
          stops: [0, 50, 100]
        }
      },
      tooltip: {
        y: {
          formatter: (val: number) => val.toString()
        }
      },
      title: {
        text: 'Interactions by Stage',
        align: 'left'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { height: 300 },
            plotOptions: { bar: { horizontal: false } },
            legend: { position: 'bottom' }
          }
        }
      ]
    };
  }

  clickDataApex(project: Iproject): ApexOptions {

    const startDate = new Date(project.date_start);
    const results = project?.results ?? [];

    const seriesData = results.map((r, i) => {

      const date = new Date(startDate);
      date.setMonth(date.getMonth() + (i * 3)); // كل مرحلة +3 شهور

      return [
        date.getTime(),
        Number(r.Click ?? 0)
      ];
    });

    return {
      series: [{
        name: 'Clicks',
        data: seriesData
      }],

      chart: {
        type: 'area',
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },

      dataLabels: { enabled: false },

      markers: { size: 4 }, // نخلي النقاط تظهر

      title: {
        text: 'Click Growth Over Time',
        align: 'left'
      },

      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },

      stroke: {
        curve: 'smooth',
        width: 3
      },

      xaxis: {
        type: 'datetime'
      },

      yaxis: {
        title: {
          text: 'Clicks'
        }
      },

      tooltip: {
        y: {
          formatter: (val: number) => `${val} Clicks`
        }
      },

      colors: ['#1f77b4']
    };
  }


  vistDataApex(project: Iproject): ApexOptions {

    const results = project?.results ?? [];

    const stages = results.map((_, i) =>
      i === 0
        ? 'Before 3 Months'
        : `After ${i * 3} Months`
    );

    const data = results.map(r => Number(r.visit_page ?? 0));

    const total = data.reduce((a, b) => a + b, 0);

    return {
      chart: {
        type: 'donut',
        height: 360,
        toolbar: { show: true }
      },
      title: {
        text: 'Distributing the number of visits according to each stage',
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333'
        }
      },
      series: data,
      labels: stages,

      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Visits',
                formatter: () => total.toString()
              }
            }
          }
        }
      },

      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(1)}%`,
        style: {
          fontSize: '14px'
        }
      },

      stroke: {
        show: true,
        width: 2,
        colors: ['#fff']
      },

      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.7,
          opacityFrom: 0.9,
          opacityTo: 0.3
        }
      },

      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },

      tooltip: {
        y: {
          formatter: (val: number) => `${val} Visits`
        }
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { height: 300 },
            legend: { position: 'bottom' }
          }
        }
      ]
    };
  }


  followersApex(project: Iproject): ApexOptions {

    const startDate = new Date(project.date_start);
    const results = project?.results ?? [];

    const seriesData = results.map((r, i) => {

      const date = new Date(startDate);
      date.setMonth(date.getMonth() + (i * 3)); // كل مرحلة +3 شهور

      return [
        date.getTime(),
        Number(r.New_follower ?? 0)
      ];
    });

    return {
      series: [{
        name: 'New Followers',
        data: seriesData
      }],

      chart: {
        type: 'area',
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },

      dataLabels: { enabled: false },

      markers: { size: 4 }, // نخليها 4 عشان النقاط تبان

      title: {
        text: 'New Followers Growth Over Time',
        align: 'left'
      },

      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },

      stroke: {
        curve: 'smooth',
        width: 3
      },

      xaxis: {
        type: 'datetime'
      },

      yaxis: {
        title: { text: 'Followers' }
      },

      tooltip: {
        y: {
          formatter: (val: number) => `${val} Followers`
        }
      },

      colors: ['#00E396']
    };
  }

}
