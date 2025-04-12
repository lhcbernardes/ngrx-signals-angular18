import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListaStore } from '../../store/lista.store';

@Component({
  selector: 'app-lista',
  imports: [CommonModule],
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
        this.store.setSearchTerm(value);
      }, 300);
    } else {
      this.store.setSearchTerm('');
    }
  }
}
