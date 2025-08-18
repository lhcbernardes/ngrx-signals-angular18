import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-custom-field',
  template: `
    <div class="custom-field">
      <label *ngIf="props.label" [for]="id" class="form-label">
        {{ props.label }}
        <span *ngIf="props.required" class="required">*</span>
      </label>
      
      <div class="custom-input-wrapper">
        <input
          [id]="id"
          [type]="props.type || 'text'"
          [placeholder]="props.placeholder"
          [formControl]="formControl"
          [formlyAttributes]="field"
          class="form-control custom-input"
          [class.is-invalid]="showError"
        />
        
        <div class="custom-icon" *ngIf="props.icon">
          <i [class]="props.icon"></i>
        </div>
      </div>
      
      <div class="invalid-feedback" *ngIf="showError">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      
      <small *ngIf="props.description" class="form-text text-muted">
        {{ props.description }}
      </small>
    </div>
  `,
  styles: [`
    .custom-field {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .required {
      color: #dc3545;
      margin-left: 2px;
    }

    .custom-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .custom-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }

    .custom-input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .custom-input.is-invalid {
      border-color: #dc3545;
    }

    .custom-icon {
      position: absolute;
      right: 12px;
      color: #6c757d;
      pointer-events: none;
    }

    .invalid-feedback {
      display: block;
      width: 100%;
      margin-top: 0.25rem;
      font-size: 0.875rem;
      color: #dc3545;
    }

    .form-text {
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  `]
})
export class CustomFieldComponent extends FieldType<FieldTypeConfig> {}
