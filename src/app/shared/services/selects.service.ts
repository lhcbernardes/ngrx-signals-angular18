import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectsService {
  getOptions1() {
    return of(['Opção A', 'Opção B']).pipe(delay(1000));
  }

  getOptions2() {
    return of(['Item 1', 'Item 2', 'Item 3']).pipe(delay(2000));
  }

  getOptions3() {
    return of(['Valor X', 'Valor Y']).pipe(delay(3000));
  }
}
