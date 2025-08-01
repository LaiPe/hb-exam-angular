import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Produit } from '../../models/produit';
import { ProduitsService } from '../../services/produits/produits.service';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  produitsService = inject(ProduitsService);
  selectedProducts: Array<Produit> = [];
  loading : boolean = true;
  private subscription!: Subscription;

  ngOnInit(){
    this.loadProducts();
  }

  selectProduct(id: number, produits: Array<Produit>): Produit | null {
    return produits.find(produit => produit.id === id) || null;
  }

  loadProducts() {
    this.subscription = this.produitsService.getAll().subscribe({
      next: produits => {
        const product1 = this.selectProduct(1, produits);
        const product2 = this.selectProduct(2, produits);
        const product10 = this.selectProduct(10, produits);
        
        if (product1 && product2 && product10) {
          this.selectedProducts = [product1, product2, product10];
        } else {
          console.error("Certains produits n'ont pas été trouvés");
        }
        this.loading = false;
      },
      error: error => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    // Importante : se désabonner pour éviter les fuites mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}