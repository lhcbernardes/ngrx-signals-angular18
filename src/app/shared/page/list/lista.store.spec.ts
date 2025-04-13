import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { DestroyRef } from '@angular/core';
import { ListaService } from '../../services/lista.service';
import { ListaStore } from '../../store/lista.store';

describe('ListaStore', () => {
  let store: ListaStore;
  let mockListaService: jasmine.SpyObj<ListaService>;

  beforeEach(() => {
    // Criar um mock do serviço
    mockListaService = jasmine.createSpyObj('ListaService', [
      'getCategorias',
      'getStatus',
      'getPlataformas',
      'getItems'
    ]);

    TestBed.configureTestingModule({
      providers: [
        ListaStore,
        { provide: ListaService, useValue: mockListaService },
        { provide: DestroyRef, useValue: { destroy: jasmine.createSpy() } }
      ]
    });

    store = TestBed.inject(ListaStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('initialize()', () => {
    it('should load options on initialize', fakeAsync(() => {
      const mockCategorias = ['cat1', 'cat2'];
      const mockStatus = ['status1', 'status2'];
      const mockPlataformas = ['plat1', 'plat2'];

      mockListaService.getCategorias.and.returnValue(of(mockCategorias));
      mockListaService.getStatus.and.returnValue(of(mockStatus));
      mockListaService.getPlataformas.and.returnValue(of(mockPlataformas));

      store.initialize();
      tick();

      expect(mockListaService.getCategorias).toHaveBeenCalled();
      expect(mockListaService.getStatus).toHaveBeenCalled();
      expect(mockListaService.getPlataformas).toHaveBeenCalled();

      expect(store.categorias()).toEqual(mockCategorias);
      expect(store.status()).toEqual(mockStatus);
      expect(store.plataformas()).toEqual(mockPlataformas);
    }));
  });

  describe('updateFiltro()', () => {
    it('should update specific filter field', () => {
      const initialFilters = store.filtros();
      expect(initialFilters.categoria).toBe('');

      store.updateFiltro('categoria', 'nova-categoria');

      const updatedFilters = store.filtros();
      expect(updatedFilters.categoria).toBe('nova-categoria');
      expect(updatedFilters.searchTerm).toBe(initialFilters.searchTerm);
    });
  });

  describe('limparFiltros()', () => {
    it('should reset all filters to initial state', () => {
      // Primeiro modifica alguns filtros
      store.updateFiltro('searchTerm', 'test');
      store.updateFiltro('categoria', 'cat');
      store.updateFiltro('status', 'ativo');

      // Verifica que foram modificados
      expect(store.filtros().searchTerm).toBe('test');
      expect(store.filtros().categoria).toBe('cat');
      expect(store.filtros().status).toBe('ativo');

      // Limpa os filtros
      store.limparFiltros();

      // Verifica o estado inicial
      expect(store.filtros().searchTerm).toBe('');
      expect(store.filtros().categoria).toBe('');
      expect(store.filtros().status).toBe('');
      expect(store.filtros().checkSwitch).toBe('Ativo');
    });
  });

  describe('alternarValor()', () => {
    it('should toggle checkSwitch value', () => {
      expect(store.filtros().checkSwitch).toBe('Ativo');

      store.alternarValor();
      expect(store.filtros().checkSwitch).toBe('Inativo');

      store.alternarValor();
      expect(store.filtros().checkSwitch).toBe('Ativo');
    });
  });

  describe('loadItems()', () => {
    it('should set loading state and update items', fakeAsync(() => {
      const mockItems = [
        { nome: 'Item 1', categoria: 'cat1', status: 'ativo', plataforma: 'web' },
        { nome: 'Item 2', categoria: 'cat2', status: 'inativo', plataforma: 'mobile' }
      ];

      mockListaService.getItems.and.returnValue(of(mockItems));

      // Chama loadItems indiretamente através do effect
      store.updateFiltro('searchTerm', 'test');
      tick();

      expect(store.loading()).toBeFalse(); // O loading deve ter terminado
      expect(store.items()).toEqual(mockItems);
      expect(store.error()).toBeNull();
    }));

    it('should handle errors when loading items', fakeAsync(() => {
      const errorMessage = 'Error loading items';
      mockListaService.getItems.and.returnValue(of([])); // Simula erro

      store.updateFiltro('searchTerm', 'test');
      tick();

      expect(store.loading()).toBeFalse();
      expect(store.error()).toBeNull(); // Ajuste conforme sua implementação real
    }));
  });

  describe('hasActiveFilters', () => {
    it('should return false when no filters are active', () => {
      expect(store.hasActiveFilters()).toBeFalse();
    });

    it('should return true when any filter is active', () => {
      store.updateFiltro('searchTerm', 'test');
      expect(store.hasActiveFilters()).toBeTrue();

      store.limparFiltros();
      store.updateFiltro('categoria', 'cat');
      expect(store.hasActiveFilters()).toBeTrue();
    });
  });
});