import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  currentProduct: Product = {
    name: '',
    sku: 0,
    brand: '',
    size: '',
    price: 0,
    principalImagen: '',
    otherImagen: ''
  };
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    console.log("aqui falta obtener el id de algun lado xD",this.route.snapshot.params['id'])
    this.getProduct(this.route.snapshot.params['id']);
  }

  getProduct(sku: any): void {
    console.log("buscar details por sku",sku)
    this.productService.findBySku(sku)
    .subscribe({
      next : (data : any)=> {
          this.currentProduct = data;
          console.log(data);
        },
      error :(err : any) => {
        console.log(err);
      }
    });
  }

  updateProduct(): void {
    this.message = '';

    this.productService.update(this.currentProduct.id, this.currentProduct)
    .subscribe({
      next : (response : any)=> {
          console.log(response);
          this.message = response.message ? response.message : 'This Product was updated successfully!';
        },
        error :(err : any) => {
          console.log(err);
        }
      });
  }

  deleteProduct(): void {
    console.log("id Product to delete",this.currentProduct.id)
    this.productService.delete(this.currentProduct.id)
    .subscribe({
      next : (response : any)=> {
          console.log(response);
          this.router.navigate(['/products']);
        },
        error :(err : any) => {
          console.log(err);
        }
      });
  }
}
