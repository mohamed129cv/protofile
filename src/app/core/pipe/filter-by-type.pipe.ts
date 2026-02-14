import { Iproject } from './../interface/iproject';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByType',
  standalone: true
})
export class FilterByTypePipe implements PipeTransform {

  transform(type:string,prjects: Iproject[]): Iproject[] | null {
    return prjects.filter(prj=> prj.project_type.toLocaleLowerCase().trim() == type.toLocaleLowerCase().trim())
  }

}
