import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Pagination} from "../_models/pagination";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Pagination>(`${environment.apiUrl}/api/categories`);
  }
}
