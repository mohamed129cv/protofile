import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { apiUrl } from '../data/data';
import { Iproject } from '../interface/iproject';


@Injectable({
    providedIn: 'root'
})
export class ProjectApiService {

    constructor(private _HttpClient: HttpClient) { }
    getAllProjects(): Observable<any> {
     return   this._HttpClient.get(apiUrl);
    }
    getProjectById(id:string): Observable<any> {
     return   this._HttpClient.get(`${apiUrl}/${id}`);
    }
    addNewProject(project: Iproject): Observable<any> {
      return  this._HttpClient.post(apiUrl, project);
    }
    updataProject(  id :number,project : Iproject): Observable<any> {
      return  this._HttpClient.put(`${apiUrl}/${id}`, project);
    }
    deletProject(  id :number): Observable<any> {
      return  this._HttpClient.delete(`${apiUrl}/${id}`);
    }


}
