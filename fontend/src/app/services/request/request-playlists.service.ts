import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestPlaylistsService {
  constructor(private request: HttpClient) {}

  get<T>(url:string):Observable<T> {
    return this.request.get<T>(url)
  }
}
