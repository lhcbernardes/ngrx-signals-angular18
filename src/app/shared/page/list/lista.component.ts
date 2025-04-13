import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaStore } from '../../store/lista.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Filtros } from '../../store/lista.model';
import { SearchInputComponent } from "../../component/search-input.component";

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchInputComponent],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  // Injeção de dependências
  public readonly store = inject(ListaStore);
  private readonly router = inject(Router);
  
  // Sinais computados para facilitar o template
  readonly items: Signal<any[]> = this.store.items;
  readonly loading: Signal<boolean> = this.store.loading;
  readonly filtros: Signal<any> = this.store.filtros;
  readonly hasActiveFilters: Signal<boolean> = this.store.hasActiveFilters;

  // Controle de pesquisa com debounce
  private searchSubject = new Subject<string>();
  readonly searchTerm = toSignal(
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  constructor() {
    // Efeito reativo para atualizar a pesquisa
    effect(() => {
      // const { searchTerm, categoria, status, plataforma } = this.store.filtros();
      // this.router.navigate([], { 
      //   queryParams: { 
      //     searchTerm: searchTerm || null,
      //     categoria: categoria || null,
      //     status: status || null,
      //     plataforma: plataforma || null
      //   },
      //   queryParamsHandling: 'merge',
      //   replaceUrl: true
      // });
    });
  }

  ngOnInit(): void {
    this.store.initialize();
  }

  // Manipuladores de eventos
  // onInput(event: Event): void {
  //   const value = (event.target as HTMLInputElement).value;
  //   this.searchSubject.next(value);
  // }

  onSelectChange(field: keyof Filtros, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.store.updateFiltro(field, value);
  }

  onSearchChange(term: string): void {
    this.store.updateFiltro('searchTerm', term);
  }

  onSearchClear(): void {
    this.store.updateFiltro('searchTerm', '');
  }

  limparFiltros(): void {
    this.store.limparFiltros();
  }

  alternarValor(): void {
    this.store.alternarValor();
  }

  goBack(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
