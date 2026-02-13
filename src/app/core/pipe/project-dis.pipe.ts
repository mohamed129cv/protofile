import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectDis',
  standalone: true
})
export class ProjectDisPipe implements PipeTransform {

  transform(dis: string , max:number = 25): unknown {
    if (!dis) return
    return dis.length > max ? `${dis.slice(0, max)}...` : dis;
  }
}
