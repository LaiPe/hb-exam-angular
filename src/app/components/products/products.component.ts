import { Component, inject } from '@angular/core';
import { Produit } from '../../models/produit';
import { Subscription } from 'rxjs';
import { ProduitsService } from '../../services/produits/produits.service';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products : Array<Produit> = [];
  loading : boolean = true;
  private subscription!: Subscription;

  service = inject(ProduitsService);

  ngOnInit() {
    this.loadProduits();
  }

  loadProduits(){
    this.subscription = this.service.getAll().subscribe({
      next : products => {
        this.products = products;
        this.loading = false;
      },
      error : error => {
        console.log(error);
        this.loading = false;
      }
    });
  }
}