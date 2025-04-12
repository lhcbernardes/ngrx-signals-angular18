import { effect, Injectable, signal } from '@angular/core';
import { ListaService } from '../services/lista.service';

@Injectable({ providedIn: 'root' })
export class ListaStore {
  // Dados que são exibidos na tabela
  itemsLoading = signal(false);
  items = signal<{ nome: string; categoria: string; status: string; plataforma: string }[]>([]);

  private effectsInitialized = false;

  nomes = signal<string[]>([]);

  valores = ['Ativo', 'Inativo'];
  valorAtual = signal(this.valores[0]);

  // Filtros
  searchTerm = signal<string>('');
  categoriaFilter = signal<string>('');
  statusFilter = signal<string>('');
  plataformaFilter = signal<string>('');

  // Opções para os selects
  categorias = signal<string[]>([]);
  status = signal<string[]>([]);
  plataformas = signal<string[]>([]);

  constructor(private service: ListaService) {
    this.setupEffects();
  }

  setNomes(novosNomes: string[]) {
    this.nomes.set(novosNomes);
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
      checkSwitch: this.valorAtual(),
    };

    this.service.getItems(params).subscribe((data: any) => {
      this.items.set(data);
      this.itemsLoading.set(false);
    });
  }

  alternarValor() {
    const proximoValor = this.valorAtual() === this.valores[0] ? this.valores[1] : this.valores[0];
    this.valorAtual.set(proximoValor);
  }

  // Limpa todos os filtros
  limparFiltros() {
    this.searchTerm.set('');
    this.statusFilter.set('');
    this.categoriaFilter.set('');
    this.plataformaFilter.set('');
    this.valorAtual.set(this.valores[0]);
  }

  private setupEffects() {
    if (this.effectsInitialized) return;
    effect(() => {
      const search = this.searchTerm();
      const categoria = this.categoriaFilter();
      const status = this.statusFilter();
      const plataforma = this.plataformaFilter();
      const checkSwitch = this.valorAtual();

      console.log('Filtros atualizados:', {
        search,
        categoria,
        status,
        plataforma,
        checkSwitch,
      });

      this.fetchItems();
    });
    this.effectsInitialized = true;
  }
}
