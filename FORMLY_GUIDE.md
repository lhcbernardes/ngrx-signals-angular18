# Formly Guide for Angular 19

## Installation

The packages have been successfully installed:
- `@ngx-formly/core`: Core Formly library
- `@ngx-formly/bootstrap`: Bootstrap UI components for Formly

## Basic Usage

### 1. Import Formly Modules

```typescript
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@Component({
  imports: [FormlyModule, FormlyBootstrapModule],
  // ... rest of component
})
```

### 2. Basic Form Setup

```typescript
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class MyComponent {
  form = new FormGroup({});
  model: any = {};
  
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      props: {
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true
      }
    }
  ];
}
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <formly-form [form]="form" [fields]="fields" [model]="model">
  </formly-form>
  <button type="submit">Submit</button>
</form>
```

## Field Types

### 1. Input Fields

```typescript
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
}
```

### 2. Select Fields

```typescript
{
  key: 'country',
  type: 'select',
  props: {
    label: 'Country',
    placeholder: 'Select your country',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'Brazil', value: 'br' }
    ]
  }
}
```

### 3. Checkbox Fields

```typescript
{
  key: 'newsletter',
  type: 'checkbox',
  props: {
    label: 'Subscribe to newsletter'
  }
}
```

### 4. Radio Fields

```typescript
{
  key: 'gender',
  type: 'radio',
  props: {
    label: 'Gender',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' }
    ]
  }
}
```

### 5. Multicheckbox Fields

```typescript
{
  key: 'interests',
  type: 'multicheckbox',
  props: {
    label: 'Interests',
    options: [
      { label: 'Technology', value: 'tech' },
      { label: 'Sports', value: 'sports' },
      { label: 'Music', value: 'music' }
    ]
  }
}
```

### 6. Textarea Fields

```typescript
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
```

## Field Groups

### 1. Basic Field Groups

```typescript
{
  key: 'address',
  fieldGroup: [
    {
      key: 'street',
      type: 'input',
      props: {
        label: 'Street',
        required: true
      }
    },
    {
      key: 'city',
      type: 'input',
      props: {
        label: 'City',
        required: true
      }
    },
    {
      key: 'zipCode',
      type: 'input',
      props: {
        label: 'ZIP Code',
        required: true
      }
    }
  ]
}
```

### 2. Field Groups with Wrappers

```typescript
{
  key: 'personalInfo',
  wrappers: ['panel'],
  fieldGroup: [
    {
      key: 'firstName',
      type: 'input',
      props: {
        label: 'First Name'
      }
    },
    {
      key: 'lastName',
      type: 'input',
      props: {
        label: 'Last Name'
      }
    }
  ]
}
```

## Validation

### 1. Built-in Validators

```typescript
{
  key: 'username',
  type: 'input',
  props: {
    label: 'Username',
    required: true,
    minLength: 3,
    maxLength: 20
  },
  validators: {
    validation: ['minLength', 'maxLength']
  }
}
```

### 2. Custom Validators

```typescript
import { Validators } from '@angular/forms';

{
  key: 'password',
  type: 'input',
  props: {
    type: 'password',
    label: 'Password',
    required: true
  },
  validators: {
    validation: [
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    ]
  }
}
```

### 3. Field Match Validation

```typescript
{
  key: 'confirmPassword',
  type: 'input',
  props: {
    type: 'password',
    label: 'Confirm Password',
    required: true
  },
  validators: {
    validation: ['fieldMatch']
  }
}
```

## Conditional Fields

### 1. Hide/Show Based on Model

```typescript
{
  key: 'companyName',
  type: 'input',
  props: {
    label: 'Company Name',
    required: true
  },
  expressions: {
    hide: (field: any) => field.model?.userType !== 'company'
  }
}
```

### 2. Disable Based on Model

```typescript
{
  key: 'confirmEmail',
  type: 'input',
  props: {
    type: 'email',
    label: 'Confirm Email',
    required: true
  },
  expressions: {
    'props.disabled': (field: any) => !field.model?.email
  }
}
```

### 3. Dynamic Options

```typescript
{
  key: 'state',
  type: 'select',
  props: {
    label: 'State',
    options: []
  },
  expressions: {
    'props.options': (field: any) => {
      const country = field.model?.country;
      return country === 'us' ? usStates : [];
    }
  }
}
```

## Custom Field Types

### 1. Create Custom Field Component

```typescript
import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-custom-field',
  template: `
    <div class="custom-field">
      <label>{{ props.label }}</label>
      <input
        [type]="props.type || 'text'"
        [formControl]="formControl"
        [formlyAttributes]="field"
        class="form-control"
      />
    </div>
  `
})
export class CustomFieldComponent extends FieldType<FieldTypeConfig> {}
```

### 2. Register Custom Field

```typescript
import { FormlyModule } from '@ngx-formly/core';
import { CustomFieldComponent } from './custom-field.component';

@NgModule({
  imports: [
    FormlyModule.forRoot({
      types: [
        { name: 'custom', component: CustomFieldComponent }
      ]
    })
  ]
})
export class AppModule {}
```

### 3. Use Custom Field

```typescript
{
  key: 'customField',
  type: 'custom',
  props: {
    label: 'Custom Field',
    type: 'text'
  }
}
```

## Dynamic Forms

### 1. Load Form Configuration from Server

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  getFormConfig(formId: string): Observable<FormlyFieldConfig[]> {
    // Return form configuration from API
    return this.http.get<FormlyFieldConfig[]>(`/api/forms/${formId}`);
  }
}
```

### 2. Use Dynamic Configuration

```typescript
export class DynamicFormComponent {
  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  model: any = {};

  constructor(private formService: FormService) {}

  loadForm(formId: string) {
    this.formService.getFormConfig(formId).subscribe(fields => {
      this.fields = fields;
    });
  }
}
```

## Form Events

### 1. Form Submission

```typescript
onSubmit() {
  if (this.form.valid) {
    console.log('Form data:', this.model);
    // Submit form data
  }
}
```

### 2. Field Change Events

```typescript
{
  key: 'email',
  type: 'input',
  props: {
    label: 'Email',
    change: (field: any, event: any) => {
      console.log('Email changed:', event.target.value);
    }
  }
}
```

### 3. Form State Changes

```typescript
ngOnInit() {
  this.form.statusChanges.subscribe(status => {
    console.log('Form status:', status);
  });
  
  this.form.valueChanges.subscribe(value => {
    console.log('Form value:', value);
  });
}
```

## Best Practices

### 1. Field Organization

```typescript
// Group related fields
{
  key: 'personal',
  fieldGroup: [
    { key: 'firstName', type: 'input', props: { label: 'First Name' } },
    { key: 'lastName', type: 'input', props: { label: 'Last Name' } }
  ]
}
```

### 2. Reusable Field Configurations

```typescript
const commonFields = {
  input: (key: string, label: string) => ({
    key,
    type: 'input',
    props: { label, required: true }
  }),
  
  email: (key: string) => ({
    key,
    type: 'input',
    props: {
      type: 'email',
      label: 'Email',
      required: true
    },
    validators: { validation: ['email'] }
  })
};
```

### 3. Error Handling

```typescript
onSubmit() {
  if (this.form.valid) {
    // Submit form
  } else {
    // Mark all fields as touched to show validation errors
    this.form.markAllAsTouched();
  }
}
```

## Example Implementation

The project includes comprehensive examples:

1. **Basic Formly Example** (`formly-example.component.ts`)
   - Basic form fields
   - Advanced form with conditional logic
   - Form validation and submission

2. **Dynamic Form Example** (`dynamic-form.component.ts`)
   - Loading form configurations from service
   - Multiple form types
   - Real-time form switching

3. **Custom Field Example** (`custom-field.component.ts`)
   - Custom field component
   - Extended styling and functionality

4. **Formly Service** (`formly.service.ts`)
   - Service for managing form configurations
   - Simulated API calls
   - Form data persistence

## Testing the Implementation

1. Run `npm start`
2. Navigate to your application
3. Use the tab navigation to switch between examples:
   - **Lottie Animations**: Previous Lottie examples
   - **Formly Examples**: Basic and advanced form examples
   - **Dynamic Forms**: Dynamic form loading examples

## Additional Resources

- [Formly Documentation](https://formly.dev/)
- [Formly Bootstrap](https://formly.dev/ui/bootstrap)
- [Formly Examples](https://formly.dev/examples/introduction)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
