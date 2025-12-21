import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

// Custom URL validator
function urlValidator(control: any) {
  if (!control.value) return null;
  try {
    new URL(control.value);
    return null;
  } catch {
    return { invalidUrl: true };
  }
}
import { TeaService } from '../../../core/services/tea.service';
import { Tea } from '../../../core/models/tea.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent implements OnInit {
  products: Tea[] = [];
  productForm: FormGroup;
  showModal = false;
  editingProduct: Tea | null = null;
  isSubmitting = false;

  searchTerm = '';
  selectedCategory = '';

  categories = ['green', 'black', 'herbal', 'white', 'oolong'];
  bestTimes = ['morning', 'afternoon', 'evening', 'anytime'];
  aromaProfiles = ['floral', 'nutty', 'earthy', 'citrusy', 'spicy'];
  benefitsOptions: string[] = [
    'Rich in antioxidants',
    'Boosts immunity',
    'Improves digestion',
    'Enhances mental alertness',
    'Reduces stress',
    'Supports heart health',
    'Aids in weight loss'
  ];
  tasteProfiles = ['earthy', 'sweet', 'bitter', 'umami', 'fruity', 'smoky', 'floral'];

  constructor(
    private teaService: TeaService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['green', Validators.required],
      image: ['', [Validators.required, urlValidator]],
      origin: ['', Validators.required],
      aromaProfile: [''],
      tasteProfile: [''],
      bestTime: ['anytime'],
      steep_time: ['', Validators.required],
      temperature: ['', Validators.required],
      active: [true],
      benefits: ['']
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.teaService.getTeas().subscribe(products => {
      this.products = products;
    });
  }

  openModal(product?: Tea) {
    this.editingProduct = product || null;
    if (product) {
      const formData = {
        ...product,
        benefits: product.benefits?.join(', ') || ''
      };
      this.productForm.patchValue(formData);
    } else {
      this.productForm.reset({
        category: 'green',
        bestTime: 'anytime',
        active: true,
        price: 0,
        aromaProfile:'floral',
        tasteProfile:'sweet',
        benefits: 'Rich in antioxidants',
        steep_time: '3',
        temperature: '85'
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingProduct = null;
    this.productForm.reset();
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.toastService.showError('Please fill in all required fields correctly');
      // Mark all fields as touched to show validation errors
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    const formValue = this.productForm.value;

    // Convert benefits string to array
    const productData = {
      ...formValue,
      benefits: formValue.benefits
        ? formValue.benefits.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')
        : []
    };

    const request = this.editingProduct
      ? this.teaService.updateTea(this.editingProduct.id, productData)
      : this.teaService.addTea(productData);

    request.subscribe({
      next: (response) => {
        if (response.success) {
          this.loadProducts();
          this.closeModal();
          this.toastService.showSuccess(this.editingProduct ? 'Product updated successfully' : 'Product added successfully');
        } else {
          this.toastService.showError(response.message || 'Failed to save product');
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error saving product:', error);
        this.toastService.showError(error.error?.message || 'Failed to save product. Please check your inputs.');
        this.isSubmitting = false;
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.teaService.deleteTea(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.products = this.products.filter(p => p.id !== id);
            this.toastService.showSuccess('Product deleted successfully');
          }
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.toastService.showError('Failed to delete product');
        }
      });
    }
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/300x300?text=Tea+Preview';
  }

  get filteredProducts(): Tea[] {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}
