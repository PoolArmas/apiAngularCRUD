import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = { };
  submitted = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  saveProduct(): void {
    const data = {
      name: this.product.name,
      sku:this.product.sku,
      brand: this.product.brand,
      size: this.product.size,
      price: this.product.price,
      principalImagen: this.product.principalImagen,
      otherImagen: this.product.otherImagen
    };

    console.log("se guardara product",data)
    this.productService.create(data)
      .subscribe({
        next : (response : any)=> {
          console.log(response);
          this.submitted = true;
        },
        error:(err : any) => {
          console.log(err);
        }
      });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {  };
  }

}
