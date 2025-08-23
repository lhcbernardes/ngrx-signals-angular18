import { Routes } from '@angular/router';
import { DatatableFixedColumnsComponent } from './datatable-fixed-columns/datatable-fixed-columns.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFormExampleComponent } from './user-form/user-form-example.component';
import { LottieExampleComponent } from './lottie-example/lottie-example.component';
import { LottieSimpleComponent } from './lottie-example/lottie-simple.component';
import { FormlyExampleComponent } from './formly-example/formly-example.component';
import { DynamicFormComponent } from './formly-example/dynamic-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/datatable', pathMatch: 'full' },
  { path: 'datatable', component: DatatableFixedColumnsComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'user-form-example', component: UserFormExampleComponent },
  { path: 'lottie', component: LottieExampleComponent },
  { path: 'lottie-simple', component: LottieSimpleComponent },
  { path: 'formly', component: FormlyExampleComponent },
  { path: 'dynamic-form', component: DynamicFormComponent },
  { path: '**', redirectTo: '/datatable' }
];
