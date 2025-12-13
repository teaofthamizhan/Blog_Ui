import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { TeaService } from '../../core/services/tea.service';
import { Tea } from '../../core/models/tea.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  allTeas: Tea[] = [];
  filteredTeas: Tea[] = [];
  selectedCategory: string = 'all';
  categories = ['all', 'green', 'black', 'herbal', 'white', 'oolong'];

  constructor(private teaService: TeaService) {}

  ngOnInit() {
    this.teaService.getTeas().subscribe(teas => {
      this.allTeas = teas;
      this.filteredTeas = teas;
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredTeas = this.allTeas;
    } else {
      this.filteredTeas = this.allTeas.filter(tea => tea.category === category);
    }
  }
}
