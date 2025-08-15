import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableFixedColumnsComponent } from './datatable-fixed-columns.component';

describe('DatatableFixedColumnsComponent', () => {
  let component: DatatableFixedColumnsComponent;
  let fixture: ComponentFixture<DatatableFixedColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatableFixedColumnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableFixedColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
