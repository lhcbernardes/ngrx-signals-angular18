import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { FormlyService, FormConfig } from './formly.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormlyBootstrapModule],
  template: `
    <div class="dynamic-form-container">
      <h2>Dynamic Forms with Formly</h2>
      
      <!-- Form Selector -->
      <div class="form-selector">
        <h3>Select a Form</h3>
        <div class="form-options">
          <button 
            *ngFor="let form of availableForms"
            (click)="loadForm(form.id)"
            [class.active]="selectedFormId === form.id"
            class="form-option-btn">
            {{ form.name }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading form configuration...</p>
      </div>

      <!-- Dynamic Form -->
      <div *ngIf="!loading && currentForm" class="dynamic-form-section">
        <h3>{{ currentForm.name }}</h3>
        
        <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()">
          <formly-form [form]="dynamicForm" [fields]="currentForm.fields" [model]="formModel">
          </formly-form>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="!dynamicForm.valid || submitting">
              <span *ngIf="!submitting">Submit Form</span>
              <span *ngIf="submitting">Submitting...</span>
            </button>
            <button 
              type="button" 
              class="btn btn-secondary" 
              (click)="resetForm()"
              [disabled]="submitting">
              Reset
            </button>
          </div>
        </form>
      </div>

      <!-- Form Results -->
      <div *ngIf="formResults" class="results-section">
        <h3>Form Results</h3>
        <div class="result-item">
          <strong>Form:</strong> {{ formResults.formName }}
        </div>
        <div class="result-item">
          <strong>Status:</strong> 
          <span [class]="formResults.success ? 'success' : 'error'">
            {{ formResults.success ? 'Success' : 'Error' }}
          </span>
        </div>
        <div class="result-item">
          <strong>Message:</strong> {{ formResults.message }}
        </div>
        <div class="result-item" *ngIf="formResults.data">
          <strong>Data:</strong>
          <pre>{{ formResults.data | json }}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dynamic-form-container {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }

    .form-selector {
      margin: 30px 0;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
    }

    .form-options {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 15px;
    }

    .form-option-btn {
      padding: 10px 20px;
      border: 2px solid #007bff;
      background-color: white;
      color: #007bff;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
    }

    .form-option-btn:hover {
      background-color: #007bff;
      color: white;
    }

    .form-option-btn.active {
      background-color: #007bff;
      color: white;
    }

    .loading-state {
      text-align: center;
      padding: 40px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .dynamic-form-section {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: white;
    }

    .form-actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: #545b62;
    }

    .results-section {
      margin-top: 30px;
      padding: 20px;
      background-color: #f0f8ff;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }

    .result-item {
      margin-bottom: 10px;
    }

    .result-item pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      margin-top: 5px;
    }

    .success {
      color: #28a745;
      font-weight: bold;
    }

    .error {
      color: #dc3545;
      font-weight: bold;
    }
  `]
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  availableForms: { id: string; name: string }[] = [];
  selectedFormId: string = '';
  currentForm: FormConfig | null = null;
  loading = false;
  submitting = false;
  
  dynamicForm = new FormGroup({});
  formModel: any = {};
  formResults: any = null;

  constructor(private formlyService: FormlyService) {}

  ngOnInit() {
    this.loadAvailableForms();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAvailableForms() {
    this.formlyService.getAvailableForms()
      .pipe(takeUntil(this.destroy$))
      .subscribe(forms => {
        this.availableForms = forms;
        if (forms.length > 0) {
          this.loadForm(forms[0].id);
        }
      });
  }

  loadForm(formId: string) {
    this.selectedFormId = formId;
    this.loading = true;
    this.formResults = null;
    this.formModel = {};
    this.dynamicForm = new FormGroup({});

    this.formlyService.getFormConfig(formId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (config) => {
          this.currentForm = config;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading form:', error);
          this.loading = false;
          this.formResults = {
            success: false,
            message: 'Error loading form configuration'
          };
        }
      });
  }

  onSubmit() {
    if (this.dynamicForm.valid && this.currentForm) {
      this.submitting = true;
      
      this.formlyService.saveFormData(this.currentForm.id, this.formModel)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result) => {
            this.submitting = false;
            this.formResults = {
              success: true,
              formName: this.currentForm?.name,
              message: result.message,
              data: this.formModel
            };
          },
          error: (error) => {
            this.submitting = false;
            this.formResults = {
              success: false,
              formName: this.currentForm?.name,
              message: 'Error submitting form',
              data: this.formModel
            };
          }
        });
    }
  }

  resetForm() {
    this.formModel = {};
    this.dynamicForm.reset();
    this.formResults = null;
  }
}
