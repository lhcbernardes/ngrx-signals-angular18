import { Routes } from '@angular/router';
import { DatatableFixedColumnsComponent } from './datatable-fixed-columns/datatable-fixed-columns.component';

export const routes: Routes = [
  { path: '', component: DatatableFixedColumnsComponent },
  { path: 'datatable', component: DatatableFixedColumnsComponent }
];
