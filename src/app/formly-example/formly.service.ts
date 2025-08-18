import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface FormConfig {
  id: string;
  name: string;
  fields: FormlyFieldConfig[];
  model?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FormlyService {

  constructor() { }

  // Simula carregamento de configuração de formulário do servidor
  getFormConfig(formId: string): Observable<FormConfig> {
    const configs: { [key: string]: FormConfig } = {
      'user-registration': {
        id: 'user-registration',
        name: 'User Registration',
        fields: [
          {
            key: 'username',
            type: 'input',
            props: {
              label: 'Username',
              placeholder: 'Enter username',
              required: true,
              minLength: 3,
              maxLength: 20
            },
            validators: {
              validation: ['minLength', 'maxLength']
            }
          },
          {
            key: 'password',
            type: 'input',
            props: {
              type: 'password',
              label: 'Password',
              placeholder: 'Enter password',
              required: true,
              minLength: 8
            },
            validators: {
              validation: ['minLength']
            }
          },
          {
            key: 'confirmPassword',
            type: 'input',
            props: {
              type: 'password',
              label: 'Confirm Password',
              placeholder: 'Confirm password',
              required: true
            },
            validators: {
              validation: ['fieldMatch']
            },
            expressions: {
              'props.disabled': (field: any) => !field.model?.password
            }
          },
          {
            key: 'profile',
            fieldGroup: [
              {
                key: 'firstName',
                type: 'input',
                props: {
                  label: 'First Name',
                  required: true
                }
              },
              {
                key: 'lastName',
                type: 'input',
                props: {
                  label: 'Last Name',
                  required: true
                }
              }
            ]
          }
        ]
      },
      'product-form': {
        id: 'product-form',
        name: 'Product Information',
        fields: [
          {
            key: 'name',
            type: 'input',
            props: {
              label: 'Product Name',
              placeholder: 'Enter product name',
              required: true
            }
          },
          {
            key: 'category',
            type: 'select',
            props: {
              label: 'Category',
              placeholder: 'Select category',
              required: true,
              options: [
                { label: 'Electronics', value: 'electronics' },
                { label: 'Clothing', value: 'clothing' },
                { label: 'Books', value: 'books' },
                { label: 'Home & Garden', value: 'home' }
              ]
            }
          },
          {
            key: 'price',
            type: 'input',
            props: {
              type: 'number',
              label: 'Price',
              placeholder: 'Enter price',
              required: true,
              min: 0,
              step: 0.01
            }
          },
          {
            key: 'description',
            type: 'textarea',
            props: {
              label: 'Description',
              placeholder: 'Enter product description',
              rows: 4
            }
          },
          {
            key: 'images',
            type: 'multicheckbox',
            props: {
              label: 'Product Images',
              options: [
                { label: 'Front View', value: 'front' },
                { label: 'Back View', value: 'back' },
                { label: 'Side View', value: 'side' },
                { label: 'Detail View', value: 'detail' }
              ]
            }
          },
          {
            key: 'inStock',
            type: 'checkbox',
            props: {
              label: 'In Stock'
            }
          }
        ]
      },
      'survey-form': {
        id: 'survey-form',
        name: 'Customer Survey',
        fields: [
          {
            key: 'satisfaction',
            type: 'radio',
            props: {
              label: 'How satisfied are you with our service?',
              required: true,
              options: [
                { label: 'Very Satisfied', value: 5 },
                { label: 'Satisfied', value: 4 },
                { label: 'Neutral', value: 3 },
                { label: 'Dissatisfied', value: 2 },
                { label: 'Very Dissatisfied', value: 1 }
              ]
            }
          },
          {
            key: 'recommend',
            type: 'select',
            props: {
              label: 'Would you recommend us to others?',
              placeholder: 'Select an option',
              options: [
                { label: 'Definitely', value: 'definitely' },
                { label: 'Probably', value: 'probably' },
                { label: 'Not sure', value: 'not-sure' },
                { label: 'Probably not', value: 'probably-not' },
                { label: 'Definitely not', value: 'definitely-not' }
              ]
            }
          },
          {
            key: 'improvements',
            type: 'multicheckbox',
            props: {
              label: 'What could we improve? (Select all that apply)',
              options: [
                { label: 'Customer Service', value: 'customer-service' },
                { label: 'Product Quality', value: 'product-quality' },
                { label: 'Website/App', value: 'website-app' },
                { label: 'Pricing', value: 'pricing' },
                { label: 'Delivery Speed', value: 'delivery-speed' },
                { label: 'Return Policy', value: 'return-policy' }
              ]
            }
          },
          {
            key: 'comments',
            type: 'textarea',
            props: {
              label: 'Additional Comments',
              placeholder: 'Please share any additional feedback...',
              rows: 4
            }
          }
        ]
      }
    };

    const config = configs[formId];
    if (!config) {
      throw new Error(`Form configuration not found for ID: ${formId}`);
    }

    // Simula delay de rede
    return of(config).pipe(delay(500));
  }

  // Simula salvamento de dados do formulário
  saveFormData(formId: string, data: any): Observable<any> {
    console.log(`Saving form data for ${formId}:`, data);
    
    // Simula delay de rede
    return of({ success: true, message: 'Data saved successfully' }).pipe(delay(1000));
  }

  // Retorna lista de formulários disponíveis
  getAvailableForms(): Observable<{ id: string; name: string }[]> {
    const forms = [
      { id: 'user-registration', name: 'User Registration' },
      { id: 'product-form', name: 'Product Information' },
      { id: 'survey-form', name: 'Customer Survey' }
    ];
    
    return of(forms).pipe(delay(300));
  }
}
