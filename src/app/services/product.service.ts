import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'any'
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  public saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  public getRecentProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/recent`);
  }

  public getActiveProducts(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  public getInactiveProducts(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inactive`);
  }

  public getActiveProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  public activeInactiveProduct(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}/active`, null);
  }

  public updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
