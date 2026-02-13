import { Pipe, PipeTransform } from '@angular/core';
import { Iproject } from '../interface/iproject';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform( projects: Iproject[] , title: string): Iproject[]  {
    return projects.filter(pro => pro.project_title.toLocaleLowerCase().trim().includes(title.toLocaleLowerCase().trim()))
  }

}
