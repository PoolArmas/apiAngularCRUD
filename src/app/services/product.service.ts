import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const baseUrl = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl+"getProducts");
  }

  findBySku(sku: any): Observable<Product> {
    return this.http.get(`${baseUrl+"productBySku"}/${sku}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl +"addProduct", data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl+"updatedProduct"}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl+"deleteProduct"}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}
