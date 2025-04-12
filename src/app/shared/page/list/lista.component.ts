import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListaStore } from '../../store/lista.store';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {
  constructor(public store: ListaStore) { }
  
  private debounceTimeout!: ReturnType<typeof setTimeout>;

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    clearTimeout(this.debounceTimeout);

    if (value.length >= 3) {
      this.debounceTimeout = setTimeout(() => {
        this.store.searchTerm.set(value);
      }, 300);
    } else {
      this.store.searchTerm.set('');
    }
  }

  // Método que trata a alteração dos selects
  onSelectChange(event: Event, filterType: string) {
    const value = (event.target as HTMLSelectElement).value;

    switch (filterType) {
      case 'status':
        this.store.statusFilter.set(value || ''); // Set status filter value
        break;
      case 'categoria':
        this.store.categoriaFilter.set(value || ''); // Set categoria filter value
        break;
      case 'plataforma':
        this.store.plataformaFilter.set(value || ''); // Set plataforma filter value
        break;
      default:
        break;
    }
  }

  limparFiltros() {
    this.store.limparFiltros();
  }
}
