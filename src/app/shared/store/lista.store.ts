import { effect, Injectable, signal } from '@angular/core';
import { ListaService } from '../services/lista.service';

@Injectable({ providedIn: 'root' })
export class ListaStore {

  // Dados que são exibidos na tabela
  itemsLoading = signal(false);
  items = signal<{ nome: string; categoria: string; status: string; plataforma: string }[]>([]);

  private effectsInitialized = false;

  // Filtros
  searchTerm = signal('');
  categoriaFilter = signal('');
  statusFilter = signal('');
  plataformaFilter = signal('');

  // Opções para os selects
  categorias = signal<string[]>([]);
  status = signal<string[]>([]);
  plataformas = signal<string[]>([]);

  constructor(private service: ListaService) {
    this.setupEffects();
  }

  public loadOptions(): void {
    this.service.getCategorias().subscribe((data: string[]) => {
      this.categorias.set(data);
    });

    this.service.getStatus().subscribe((data: string[]) => {
      this.status.set(data);
    });

    this.service.getPlataformas().subscribe((data: string[]) => {
      this.plataformas.set(data);
    });
  }

  fetchItems(): void {
    this.itemsLoading.set(true);

    const params = {
      searchTerm: this.searchTerm(),
      categoria: this.categoriaFilter(),
      status: this.statusFilter(),
      plataforma: this.plataformaFilter(),
    };

    this.service.getItems(params).subscribe((data: any) => { 
      this.items.set(data);
      this.itemsLoading.set(false);
    });
  }

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  setCategoriaFilter(value: string) {
    this.categoriaFilter.set(value);
  }

  setStatusFilter(value: string) {
    this.statusFilter.set(value);
  }

  setPlataformaFilter(value: string) {
    this.plataformaFilter.set(value);
  }

  private setupEffects() {
    if (this.effectsInitialized) return;
    effect(() => {
      const search = this.searchTerm();
      const categoria = this.categoriaFilter();
      const status = this.statusFilter();
      const plataforma = this.plataformaFilter();

      console.log('Filtros atualizados:', {
        search,
        categoria,
        status,
        plataforma
      });

      this.fetchItems();
    });
    this.effectsInitialized = true;
  }
}
