import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public urlEndpoint = 'http://localhost:4000';

  public productsSub = new Subject();
  constructor(public http: HttpClient, public router: Router) {
   }

  addProduct(info) {
    return this.http.post<{message: string, products: any}>(`${this.urlEndpoint}/api/product/addProduct`,info);
  }

  fetchProducts(){
    return this.http.get(`${this.urlEndpoint}/api/product/getProducts`);
  }

  editProduct(info) {
    return this.http.post<{message: string, products: any}>(`${this.urlEndpoint}/api/product/editProd`, info);
  }

  deleteProduct(info) {
    return this.http.post<{message: string, products: any}>(`${this.urlEndpoint}/api/product/deleteProd`, info);
  }
}
