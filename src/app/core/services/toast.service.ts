import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toasts: Toast[] = [];
    private toastSubject = new BehaviorSubject<Toast[]>([]);
    private counter = 0;

    getToasts(): Observable<Toast[]> {
        return this.toastSubject.asObservable();
    }

    showSuccess(message: string, duration = 3000) {
        this.addToast(message, 'success', duration);
    }

    showError(message: string, duration = 5000) {
        this.addToast(message, 'error', duration);
    }

    showInfo(message: string, duration = 3000) {
        this.addToast(message, 'info', duration);
    }

    private addToast(message: string, type: 'success' | 'error' | 'info', duration: number) {
        const id = this.counter++;
        const toast: Toast = { id, message, type, duration };
        this.toasts.push(toast);
        this.toastSubject.next([...this.toasts]);

        if (duration > 0) {
            setTimeout(() => {
                this.remove(id);
            }, duration);
        }
    }

    remove(id: number) {
        this.toasts = this.toasts.filter(t => t.id !== id);
        this.toastSubject.next([...this.toasts]);
    }
}
