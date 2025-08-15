import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  nome: string;
  cargo: string;
  localizacao: string;
  departamento: string;
  salario: string;
  dataContratacao: string;
  telefone: string;
  email: string;
  status: string;
}

interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-datatable-fixed-columns',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datatable-fixed-columns.component.html',
  styleUrls: ['./datatable-fixed-columns.component.scss']
})
export class DatatableFixedColumnsComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild('tableWrapper') tableWrapper!: ElementRef;
  @ViewChild('fixedColumns') fixedColumns!: ElementRef;

  // Dados originais
  originalEmployees: Employee[] = [
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Desenvolvedor Full Stack',
      localizacao: 'São Paulo, SP',
      departamento: 'Tecnologia',
      salario: 'R$ 8.500,00',
      dataContratacao: '15/03/2022',
      telefone: '(11) 99999-1111',
      email: 'joao.silva@empresa.com',
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'UX/UI Designer',
      localizacao: 'Rio de Janeiro, RJ',
      departamento: 'Design',
      salario: 'R$ 7.200,00',
      dataContratacao: '22/07/2021',
      telefone: '(21) 88888-2222',
      email: 'maria.santos@empresa.com',
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      cargo: 'Product Manager',
      localizacao: 'Belo Horizonte, MG',
      departamento: 'Produto',
      salario: 'R$ 12.000,00',
      dataContratacao: '10/01/2023',
      telefone: '(31) 77777-3333',
      email: 'pedro.oliveira@empresa.com',
      status: 'Ativo'
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cargo: 'Analista de Dados',
      localizacao: 'Curitiba, PR',
      departamento: 'Analytics',
      salario: 'R$ 6.800,00',
      dataContratacao: '05/09/2022',
      telefone: '(41) 66666-4444',
      email: 'ana.costa@empresa.com',
      status: 'Ativo'
    },
    {
      id: 5,
      nome: 'Carlos Ferreira',
      cargo: 'DevOps Engineer',
      localizacao: 'Porto Alegre, RS',
      departamento: 'Infraestrutura',
      salario: 'R$ 9.500,00',
      dataContratacao: '18/11/2021',
      telefone: '(51) 55555-5555',
      email: 'carlos.ferreira@empresa.com',
      status: 'Ativo'
    },
    {
      id: 6,
      nome: 'Lucia Rodrigues',
      cargo: 'Scrum Master',
      localizacao: 'Brasília, DF',
      departamento: 'Agile',
      salario: 'R$ 8.200,00',
      dataContratacao: '03/05/2023',
      telefone: '(61) 44444-6666',
      email: 'lucia.rodrigues@empresa.com',
      status: 'Ativo'
    },
    {
      id: 7,
      nome: 'Roberto Almeida',
      cargo: 'QA Engineer',
      localizacao: 'Salvador, BA',
      departamento: 'Qualidade',
      salario: 'R$ 7.800,00',
      dataContratacao: '12/08/2022',
      telefone: '(71) 33333-7777',
      email: 'roberto.almeida@empresa.com',
      status: 'Ativo'
    },
    {
      id: 8,
      nome: 'Fernanda Lima',
      cargo: 'Tech Lead',
      localizacao: 'Recife, PE',
      departamento: 'Tecnologia',
      salario: 'R$ 15.000,00',
      dataContratacao: '25/02/2021',
      telefone: '(81) 22222-8888',
      email: 'fernanda.lima@empresa.com',
      status: 'Ativo'
    }
  ];

  // Dados filtrados e paginados
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  displayedEmployees: Employee[] = [];

  // Configurações da tabela
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  searchTerm = '';
  sortConfig: SortConfig = { column: 'nome', direction: 'asc' };
  fixedColumnsCount = 1; // Nova propriedade para controlar quantas colunas ficam fixas

  // Configurações de colunas
  columns = [
    { key: 'nome', title: 'Nome', width: '200px', sortable: true },
    { key: 'cargo', title: 'Cargo', width: '250px', sortable: true },
    { key: 'localizacao', title: 'Localização', width: '200px', sortable: true },
    { key: 'departamento', title: 'Departamento', width: '150px', sortable: true },
    { key: 'salario', title: 'Salário', width: '150px', sortable: true },
    { key: 'dataContratacao', title: 'Data Contratação', width: '150px', sortable: true },
    { key: 'telefone', title: 'Telefone', width: '150px', sortable: true },
    { key: 'email', title: 'Email', width: '250px', sortable: true },
    { key: 'status', title: 'Status', width: '100px', sortable: true }
  ];

  // Opções de paginação
  pageSizeOptions = [5, 10, 25, 50];

  // Propriedade Math para uso no template
  Math = Math;

  constructor() { }

  ngOnInit(): void {
    this.initializeData();
  }

  ngAfterViewInit(): void {
    this.setupFixedColumns();
  }

  ngOnDestroy(): void {
    // Cleanup se necessário
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setupFixedColumns();
  }

  private initializeData(): void {
    this.employees = [...this.originalEmployees];
    this.applyFiltersAndPagination();
  }

  private setupFixedColumns(): void {
    // Sincroniza o scroll das colunas fixas com o scroll horizontal
    if (this.tableWrapper && this.fixedColumns) {
      const tableWrapper = this.tableWrapper.nativeElement;
      const fixedColumns = this.fixedColumns.nativeElement;

      tableWrapper.addEventListener('scroll', () => {
        fixedColumns.scrollTop = tableWrapper.scrollTop;
      });
    }
  }

  // Método para obter colunas fixas
  getFixedColumns() {
    return this.columns.slice(0, this.fixedColumnsCount);
  }

  // Método para obter colunas scrolláveis
  getScrollableColumns() {
    return this.columns.slice(this.fixedColumnsCount);
  }

  // Método para obter valores das colunas fixas
  getFixedColumnValues(employee: Employee) {
    return this.getFixedColumns().map(column => employee[column.key as keyof Employee]);
  }

  // Método para obter valores das colunas scrolláveis
  getScrollableColumnValues(employee: Employee) {
    return this.getScrollableColumns().map(column => employee[column.key as keyof Employee]);
  }

  // Busca
  onSearch(): void {
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  // Ordenação
  onSort(columnKey: string): void {
    if (this.sortConfig.column === columnKey) {
      this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortConfig.column = columnKey;
      this.sortConfig.direction = 'asc';
    }
    this.applyFiltersAndPagination();
  }

  // Paginação
  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFiltersAndPagination();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  // Método para alterar número de colunas fixas
  onFixedColumnsChange(): void {
    // Reaplicar filtros e paginação para atualizar a visualização
    this.applyFiltersAndPagination();
    // Reconfigurar as colunas fixas após a mudança
    setTimeout(() => {
      this.setupFixedColumns();
    }, 0);
  }

  private applyFiltersAndPagination(): void {
    // Aplicar busca
    this.filteredEmployees = this.employees.filter(employee => {
      if (!this.searchTerm) return true;
      
      const searchLower = this.searchTerm.toLowerCase();
      return (
        employee.nome.toLowerCase().includes(searchLower) ||
        employee.cargo.toLowerCase().includes(searchLower) ||
        employee.localizacao.toLowerCase().includes(searchLower) ||
        employee.departamento.toLowerCase().includes(searchLower) ||
        employee.salario.toLowerCase().includes(searchLower) ||
        employee.dataContratacao.toLowerCase().includes(searchLower) ||
        employee.telefone.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.status.toLowerCase().includes(searchLower)
      );
    });

    // Aplicar ordenação
    this.filteredEmployees.sort((a, b) => {
      const aValue = this.getPropertyValue(a, this.sortConfig.column);
      const bValue = this.getPropertyValue(b, this.sortConfig.column);
      
      if (this.sortConfig.direction === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    // Calcular paginação
    this.totalRecords = this.filteredEmployees.length;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    
    // Ajustar página atual se necessário
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }

    // Aplicar paginação
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  private getPropertyValue(obj: any, key: string): string {
    return obj[key]?.toString() || '';
  }

  // Métodos de utilidade
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let end = Math.min(this.totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  // Adicionar novo funcionário
  addNewEmployee(): void {
    const newEmployee: Employee = {
      id: this.originalEmployees.length + 1,
      nome: 'Novo Funcionário',
      cargo: 'Cargo Temporário',
      localizacao: 'Localização Temporária',
      departamento: 'Departamento Temporário',
      salario: 'R$ 0,00',
      dataContratacao: new Date().toLocaleDateString('pt-BR'),
      telefone: '(00) 00000-0000',
      email: 'novo@empresa.com',
      status: 'Ativo'
    };
    
    this.originalEmployees.push(newEmployee);
    this.employees = [...this.originalEmployees];
    this.applyFiltersAndPagination();
  }

  // Recarregar tabela
  reloadTable(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.sortConfig = { column: 'nome', direction: 'asc' };
    this.initializeData();
  }

  // Verificar se a coluna está ordenada
  isSorted(columnKey: string): boolean {
    return this.sortConfig.column === columnKey;
  }

  // Obter ícone de ordenação
  getSortIcon(columnKey: string): string {
    if (!this.isSorted(columnKey)) return '↕️';
    return this.sortConfig.direction === 'asc' ? '↑' : '↓';
  }
}
