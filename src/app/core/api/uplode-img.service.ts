import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { imgMainUrl } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class UplodeImgService {

  constructor(private _HttpClient:HttpClient) { }

  uplodeImg(img : any):Observable<any>{
    return this._HttpClient.post(imgMainUrl , img)
  }
}
