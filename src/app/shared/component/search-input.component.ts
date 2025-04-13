import { Component, EventEmitter, Input, Output, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-input-container">
      <input
        type="text"
        [placeholder]="placeholder"
        [value]="inputValue()"
        (input)="handleInput($event)"
        [attr.aria-label]="ariaLabel"
      />
      <button
        *ngIf="showClearButton && inputValue()"
        type="button"
        class="clear-button"
        (click)="clearSearch()"
        aria-label="Limpar busca"
      >
        ×
      </button>
    </div>
  `,
  styles: [`
    /* Estilos mantidos iguais */
  `]
})
export class SearchInputComponent {
  private searchSubject = new Subject<string>();
  readonly inputValue = signal<string>('');

  @Input() placeholder = 'Buscar...';
  @Input() ariaLabel = 'Campo de busca';
  @Input() debounceTime = 300;
  @Input() showClearButton = true;
  @Input() set disabled(val: boolean) { this._disabled.set(val); }
  @Input() set value(val: string) { this.inputValue.set(val || ''); }
  readonly _disabled = signal(false);

  @Output() searchChange = new EventEmitter<string>();
  @Output() searchClear = new EventEmitter<void>();

  constructor() {
    // Configura o debounce para a pesquisa
    this.searchSubject.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(value => {
      this.searchChange.emit(value);
    });

    // Sincroniza o valor inicial
    effect(() => {
      const val = this.inputValue();
      this.searchSubject.next(val);
    });
  }

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue.set(value);
    // Não emite imediatamente - o debounce cuidará disso
  }

  clearSearch(): void {
    this.inputValue.set('');
    this.searchClear.emit();
  }
}
