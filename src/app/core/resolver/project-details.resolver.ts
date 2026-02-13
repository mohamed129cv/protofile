import { ResolveFn } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Iproject } from '../interface/iproject';
import { inject } from '@angular/core';
import { ProjectApiService } from '../api/ProjectApiService';

export const projectDetailsResolver: ResolveFn<Observable <Iproject>> = (route, state) => {
 let id = route.paramMap.get('id')
  const api = inject(ProjectApiService)
  return id ? api.getProjectById(id) : EMPTY;
};
