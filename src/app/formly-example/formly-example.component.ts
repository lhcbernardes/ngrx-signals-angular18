import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@Component({
  selector: 'app-formly-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormlyBootstrapModule],
  template: `
    <div class="formly-container">
      <h2>Formly Example - Dynamic Forms</h2>
      
      <!-- Basic Form -->
      <div class="form-section">
        <h3>Basic Form</h3>
        <form [formGroup]="basicForm" (ngSubmit)="onBasicSubmit()">
          <formly-form [form]="basicForm" [fields]="basicFields" [model]="basicModel">
          </formly-form>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!basicForm.valid">
              Submit Basic Form
            </button>
            <button type="button" class="btn btn-secondary" (click)="resetBasicForm()">
              Reset
            </button>
          </div>
        </form>
      </div>

      <!-- Advanced Form -->
      <div class="form-section">
        <h3>Advanced Form with Conditional Fields</h3>
        <form [formGroup]="advancedForm" (ngSubmit)="onAdvancedSubmit()">
          <formly-form [form]="advancedForm" [fields]="advancedFields" [model]="advancedModel">
          </formly-form>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!advancedForm.valid">
              Submit Advanced Form
            </button>
            <button type="button" class="btn btn-secondary" (click)="resetAdvancedForm()">
              Reset
            </button>
          </div>
        </form>
      </div>

      <!-- Form Results -->
      <div class="results-section" *ngIf="formResults">
        <h3>Form Results</h3>
        <pre>{{ formResults | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .formly-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .form-section {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .form-actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }

    .results-section {
      margin-top: 30px;
      padding: 20px;
      background-color: #f0f8ff;
      border-radius: 8px;
    }

    .results-section pre {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .btn-primary:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #545b62;
    }
  `]
})
export class FormlyExampleComponent implements OnInit {
  basicForm = new FormGroup({});
  advancedForm = new FormGroup({});
  
  basicModel: any = {};
  advancedModel: any = {};
  
  formResults: any = null;

  // Basic form fields
  basicFields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      props: {
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true,
        minLength: 2,
        maxLength: 50
      },
      validators: {
        validation: ['minLength', 'maxLength']
      }
    },
    {
      key: 'lastName',
      type: 'input',
      props: {
        label: 'Last Name',
        placeholder: 'Enter your last name',
        required: true,
        minLength: 2,
        maxLength: 50
      },
      validators: {
        validation: ['minLength', 'maxLength']
      }
    },
    {
      key: 'email',
      type: 'input',
      props: {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      },
      validators: {
        validation: ['email']
      }
    },
    {
      key: 'age',
      type: 'input',
      props: {
        type: 'number',
        label: 'Age',
        placeholder: 'Enter your age',
        min: 18,
        max: 120
      },
      validators: {
        validation: ['min', 'max']
      }
    },
    {
      key: 'gender',
      type: 'select',
      props: {
        label: 'Gender',
        placeholder: 'Select your gender',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' }
        ]
      }
    },
    {
      key: 'interests',
      type: 'multicheckbox',
      props: {
        label: 'Interests',
        options: [
          { label: 'Technology', value: 'technology' },
          { label: 'Sports', value: 'sports' },
          { label: 'Music', value: 'music' },
          { label: 'Reading', value: 'reading' },
          { label: 'Travel', value: 'travel' }
        ]
      }
    },
    {
      key: 'bio',
      type: 'textarea',
      props: {
        label: 'Bio',
        placeholder: 'Tell us about yourself',
        rows: 4,
        maxLength: 500
      }
    }
  ];

  // Advanced form fields with conditional logic
  advancedFields: FormlyFieldConfig[] = [
    {
      key: 'userType',
      type: 'select',
      props: {
        label: 'User Type',
        placeholder: 'Select user type',
        required: true,
        options: [
          { label: 'Individual', value: 'individual' },
          { label: 'Company', value: 'company' },
          { label: 'Organization', value: 'organization' }
        ]
      }
    },
    {
      key: 'companyName',
      type: 'input',
      props: {
        label: 'Company Name',
        placeholder: 'Enter company name',
        required: true
      },
      expressions: {
        hide: (field: any) => field.model?.userType !== 'company' && field.model?.userType !== 'organization'
      }
    },
    {
      key: 'companySize',
      type: 'select',
      props: {
        label: 'Company Size',
        placeholder: 'Select company size',
        options: [
          { label: '1-10 employees', value: 'small' },
          { label: '11-50 employees', value: 'medium' },
          { label: '51-200 employees', value: 'large' },
          { label: '200+ employees', value: 'enterprise' }
        ]
      },
      expressions: {
        hide: (field: any) => field.model?.userType !== 'company' && field.model?.userType !== 'organization'
      }
    },
    {
      key: 'personalInfo',
      fieldGroup: [
        {
          key: 'phone',
          type: 'input',
          props: {
            type: 'tel',
            label: 'Phone Number',
            placeholder: 'Enter phone number',
            pattern: /^[\+]?[1-9][\d]{0,15}$/
          }
        },
        {
          key: 'address',
          type: 'textarea',
          props: {
            label: 'Address',
            placeholder: 'Enter your address',
            rows: 3
          }
        }
      ],
      expressions: {
        hide: (field: any) => field.model?.userType === 'company' || field.model?.userType === 'organization'
      }
    },
    {
      key: 'preferences',
      type: 'multicheckbox',
      props: {
        label: 'Preferences',
        options: [
          { label: 'Email notifications', value: 'email' },
          { label: 'SMS notifications', value: 'sms' },
          { label: 'Push notifications', value: 'push' },
          { label: 'Newsletter', value: 'newsletter' }
        ]
      }
    },
    {
      key: 'terms',
      type: 'checkbox',
      props: {
        label: 'I agree to the terms and conditions',
        required: true
      }
    }
  ];

  ngOnInit() {
    // Initialize forms
    this.basicForm = new FormGroup({});
    this.advancedForm = new FormGroup({});
  }

  onBasicSubmit() {
    if (this.basicForm.valid) {
      this.formResults = {
        formType: 'Basic Form',
        data: this.basicModel,
        timestamp: new Date().toISOString()
      };
      console.log('Basic form submitted:', this.basicModel);
    }
  }

  onAdvancedSubmit() {
    if (this.advancedForm.valid) {
      this.formResults = {
        formType: 'Advanced Form',
        data: this.advancedModel,
        timestamp: new Date().toISOString()
      };
      console.log('Advanced form submitted:', this.advancedModel);
    }
  }

  resetBasicForm() {
    this.basicForm.reset();
    this.basicModel = {};
    this.formResults = null;
  }

  resetAdvancedForm() {
    this.advancedForm.reset();
    this.advancedModel = {};
    this.formResults = null;
  }
}
