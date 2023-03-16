import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products?: Product[];
  currentProduct?: Product;
  currentIndex = -1;
  sku?:number;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getAll()
    .subscribe({
      next : (data : any)=> {
          this.products = data;
          console.log(data);
        },
        error:(err : any) => {
          console.log(err);
        }
      });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.products = undefined;
    this.currentIndex = -1;
  }

  setActiveProduct(products: Product, index: number): void {
    this.currentProduct = products;
    this.currentProduct.price= Utils.formatPrice(this.currentProduct.price);
    this.currentIndex = index;
  } 

  removeAllProducts(): void {
    this.productService.deleteAll()
    .subscribe({
      next : (response : any)=> {
          console.log(response);
          this.refreshList();
        },
        error:(err : any) => {
          console.log(err);
        }
      });
  }

  searchProductBySku(): void {
    console.log(" aqui paso", this.sku)
    this.currentProduct = undefined;
    this.currentIndex = -1;

    this.productService.findBySku(this.sku)
    .subscribe({
      next : (data : any) => {
          this.products = [data];
          console.log(data);
        },
        error:(err : any) => {
          console.log(err);
        }
      });
  }

  formatPrice(valor:any) {
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  }

}
