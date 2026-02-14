import { Pipe, PipeTransform } from '@angular/core';
import { Iproject } from '../interface/iproject';

@Pipe({
  name: 'getType',
  standalone: true
})
export class GetTypePipe implements PipeTransform {

  transform(projects: Iproject[]): string[] {
    return Array.from(new Set(projects.map(pro=>pro.project_type.toLocaleLowerCase().trim())));
  }

}
