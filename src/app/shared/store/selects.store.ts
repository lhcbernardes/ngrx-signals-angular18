import { Injectable, signal } from '@angular/core';
import { SelectsService } from '../services/selects.service';

@Injectable({ providedIn: 'root' })
export class SelectsStore {
  options1 = signal<string[]>([]);
  options2 = signal<string[]>([]);
  options3 = signal<string[]>([]);

  loading1 = signal(true);
  loading2 = signal(true);
  loading3 = signal(true);

  constructor(private service: SelectsService) {}

  loadOptions() {
    this.loading1.set(true);
    this.loading2.set(true);
    this.loading3.set(true);

    this.service.getOptions1().subscribe(data => {
      this.options1.set(data);
      this.addMoreOptions(this.options1, 'Extra A');
      this.loading1.set(false);
    });

    this.service.getOptions2().subscribe(data => {
      this.options2.set(data);
      this.addMoreOptions(this.options2, 'Extra B');
      this.loading2.set(false);
    });

    this.service.getOptions3().subscribe(data => {
      this.options3.set(data);
      this.addMoreOptions(this.options3, 'Extra C');
      this.loading3.set(false);
    });
  }

  private addMoreOptions(optionsSignal: ReturnType<typeof signal<string[]>>, prefix: string) {
    optionsSignal.update(current => [
      ...current,
      `${prefix} 1`,
      `${prefix} 2`,
      `${prefix} 3`
    ]);
  }
}
