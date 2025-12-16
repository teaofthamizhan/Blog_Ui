import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tea } from '../../../core/models/tea.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() tea!: Tea;
}
