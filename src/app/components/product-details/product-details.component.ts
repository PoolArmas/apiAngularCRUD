import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import Utils from 'src/app/utils/utils';

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
    this.getProduct(this.route.snapshot.params['id']);
  }

  getProduct(id: any): void {
    this.productService.findById(id)
    .subscribe({
      next : (data : any)=> {
          data.price = Utils.formatPrice(data.price);
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
