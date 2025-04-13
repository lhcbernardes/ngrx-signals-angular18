import { computed, DestroyRef, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ListaService } from '../services/lista.service';
import { Filtros, Item } from './lista.model';

const initialState: Filtros = {
  searchTerm: '',
  categoria: '',
  status: '',
  plataforma: '',
  checkSwitch: 'Ativo',
}

@Injectable({ providedIn: 'root' })
export class ListaStore {
  private readonly service = inject(ListaService);
  private readonly destroyRef = inject(DestroyRef);

  // Estado
  private readonly _items = signal<Item[]>([]);
  private readonly _categorias = signal<string[]>([]);
  private readonly _status = signal<string[]>([]);
  private readonly _plataformas = signal<string[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _filtros = signal<Filtros>(initialState);

  // Sinais computados
  readonly items: Signal<Item[]> = this._items.asReadonly();
  readonly categorias: Signal<string[]> = this._categorias.asReadonly();
  readonly status: Signal<string[]> = this._status.asReadonly();
  readonly plataformas: Signal<string[]> = this._plataformas.asReadonly();
  readonly loading: Signal<boolean> = this._loading.asReadonly();
  readonly error: Signal<string | null> = this._error.asReadonly();
  readonly filtros: Signal<Filtros> = this._filtros.asReadonly();
  readonly valores = ['Ativo', 'Inativo'] as const;
  
  readonly hasActiveFilters = computed(() => {
    const f = this._filtros();
    return !!f.searchTerm || !!f.categoria || !!f.status || !!f.plataforma;
  });

  constructor() {
    // Efeito automático para carregar itens quando filtros mudam
    effect(() => {
        this.loadItems(this._filtros());
    });

    // Configura debounce para searchTerm
    // toObservable(this._filtros)
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged((prev, curr) => prev.searchTerm === curr.searchTerm),
    //     takeUntilDestroyed(this.destroyRef)
    //   )
    //   .subscribe(filtros => {
    //       this.loadItems(filtros);
    //   });
  }

  // Métodos públicos
  initialize(): void {
    this.loadOptions();
    // this.loadItems(this._filtros());
  }

  updateFiltro<K extends keyof Filtros>(campo: K, valor: Filtros[K]): void {
    this._filtros.update(f => ({ ...f, [campo]: valor }));
  }

  limparFiltros(): void {
    this._filtros.set({
      searchTerm: '',
      categoria: '',
      status: '',
      plataforma: '',
      checkSwitch: 'Ativo',
    });
  }

  alternarValor(): void {
    this._filtros.update(f => ({
      ...f,
      checkSwitch: f.checkSwitch === 'Ativo' ? 'Inativo' : 'Ativo'
    }));
  }

  // Métodos privados
  private loadOptions(): void {
    combineLatest([
      this.service.getCategorias(),
      this.service.getStatus(),
      this.service.getPlataformas()
    ]).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(([categorias, status, plataformas]) => {
      this._categorias.set(categorias);
      this._status.set(status);
      this._plataformas.set(plataformas);
    });
  }

  private loadItems(filtros: Filtros): void {
    this._loading.set(true);
    this._error.set(null);

    this.service.getItems(filtros).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this._loading.set(false)),
    ).subscribe((response: { nome: string; categoria: string; status: string; plataforma: string; }[]) => {
      this._items.set(response);
    });
  }
}
