# Guia Completo: DataTables com FixedColumns no Angular 18

Este guia demonstra como configurar e usar o DataTables com a extensão FixedColumns no Angular 18.

## 📋 Pré-requisitos

- Angular 18+
- Node.js e npm
- Conhecimento básico de TypeScript

## 🚀 Instalação

### 1. Instalar Dependências

```bash
npm install datatables.net datatables.net-dt datatables.net-fixedcolumns datatables.net-fixedcolumns-dt jquery
```

### 2. Configurar angular.json

Adicione os arquivos CSS e JS no `angular.json`:

```json
{
  "architect": {
    "build": {
      "options": {
        "styles": [
          "node_modules/datatables.net-dt/css/jquery.dataTables.css",
          "node_modules/datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.css"
        ],
        "scripts": [
          "node_modules/jquery/dist/jquery.js",
          "node_modules/datatables.net/js/jquery.dataTables.js",
          "node_modules/datatables.net-fixedcolumns/js/dataTables.fixedColumns.js"
        ]
      }
    }
  }
}
```

### 3. Configurar TypeScript

Crie um arquivo `src/types/jquery.d.ts`:

```typescript
declare var $: any;
declare var jQuery: any;

interface JQuery {
  DataTable(options?: any): any;
}

interface JQueryStatic {
  DataTable: any;
}
```

Atualize o `tsconfig.json`:

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": [
    "src/**/*"
  ]
}
```

## 🎯 Implementação

### 1. Componente TypeScript

```typescript
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var $: any;

interface Employee {
  id: number;
  nome: string;
  cargo: string;
  localizacao: string;
  // ... outros campos
}

@Component({
  selector: 'app-datatable-fixed-columns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datatable-fixed-columns.component.html',
  styleUrls: ['./datatable-fixed-columns.component.scss']
})
export class DatatableFixedColumnsComponent implements OnInit, AfterViewInit, OnDestroy {
  
  employees: Employee[] = [
    // ... seus dados
  ];

  private dataTable: any;

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  private initializeDataTable(): void {
    setTimeout(() => {
      this.dataTable = $('#employeesTable').DataTable({
        data: this.employees,
        columns: [
          { title: 'Nome', data: 'nome', width: '200px' },
          { title: 'Cargo', data: 'cargo', width: '250px' },
          { title: 'Localização', data: 'localizacao', width: '200px' },
          // ... outras colunas
        ],
        scrollX: true,                    // Scroll horizontal
        scrollY: '400px',                 // Altura máxima
        scrollCollapse: true,             // Colapsar scroll
        fixedColumns: {
          start: 1                        // Fixar primeira coluna
        },
        language: {
          url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/pt-BR.json'
        },
        pageLength: 10,
        lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
        responsive: false,
        dom: '<"top"lf>rt<"bottom"ip><"clear">'
      });
    }, 100);
  }
}
```

### 2. Template HTML

```html
<div class="datatable-container">
  <div class="table-wrapper">
    <table id="employeesTable" class="display" style="width:100%">
      <!-- O DataTables gera automaticamente o conteúdo -->
    </table>
  </div>
</div>
```

### 3. Estilos CSS

```scss
.datatable-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.table-wrapper {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  
  .dataTables_wrapper {
    padding: 20px;
    
    .dataTables_scroll {
      border: 1px solid #ddd;
      border-radius: 4px;
      
      .dataTables_scrollHead {
        background-color: #f8f9fa;
        
        th {
          background-color: #34495e;
          color: white;
          padding: 12px 8px;
          font-weight: 600;
        }
      }
      
      .dataTables_scrollBody {
        tbody tr {
          &:nth-child(even) {
            background-color: #f8f9fa;
          }
          
          &:hover {
            background-color: #e3f2fd;
          }
        }
      }
    }
  }
}

// Estilos para FixedColumns
.DTFC_Cloned {
  background-color: #f8f9fa !important;
  
  th {
    background-color: #34495e !important;
    color: white !important;
  }
}
```

## ⚙️ Configurações Principais

### Scroll Horizontal
```typescript
scrollX: true
```

### Colunas Fixas
```typescript
fixedColumns: {
  start: 1,        // Fixar primeira coluna
  end: 1           // Fixar última coluna (opcional)
}
```

### Altura Máxima
```typescript
scrollY: '400px',
scrollCollapse: true
```

### Idioma Português
```typescript
language: {
  url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/pt-BR.json'
}
```

### Paginação
```typescript
pageLength: 10,
lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]]
```

## 🔧 Funcionalidades Avançadas

### Atualizar Dados
```typescript
reloadTable(): void {
  if (this.dataTable) {
    this.dataTable.clear();
    this.dataTable.rows.add(this.employees);
    this.dataTable.draw();
  }
}
```

### Adicionar Nova Linha
```typescript
addNewEmployee(): void {
  const newEmployee = { /* dados */ };
  this.employees.push(newEmployee);
  this.reloadTable();
}
```

### Eventos
```typescript
this.dataTable = $('#employeesTable').DataTable({
  // ... configurações
  initComplete: function() {
    console.log('DataTable inicializado!');
  },
  drawCallback: function() {
    console.log('Tabela redesenhada!');
  }
});
```

## 🎨 Personalização

### Cores e Temas
```scss
// Cabeçalhos
th {
  background-color: #34495e;
  color: white;
}

// Linhas alternadas
tr:nth-child(even) {
  background-color: #f8f9fa;
}

// Hover
tr:hover {
  background-color: #e3f2fd;
}
```

### Responsividade
```scss
@media (max-width: 768px) {
  .datatable-container {
    padding: 10px;
  }
  
  .dataTables_filter input {
    width: 150px;
  }
}
```

## 🐛 Solução de Problemas

### Erro: "$ is not defined"
- Verifique se o jQuery está carregado antes do DataTables
- Confirme se os scripts estão na ordem correta no `angular.json`

### Colunas não ficam fixas
- Certifique-se de que `scrollX: true` está habilitado
- Verifique se a extensão FixedColumns está carregada

### Estilos não aplicados
- Verifique se os arquivos CSS estão incluídos no `angular.json`
- Use `!important` para sobrescrever estilos do DataTables

### Performance
- Use `scrollY` para limitar a altura da tabela
- Considere usar `deferRender: true` para grandes datasets

## 📚 Recursos Adicionais

- [Documentação oficial do DataTables](https://datatables.net/)
- [Documentação do FixedColumns](https://datatables.net/extensions/fixedcolumns/)
- [Repositório GitHub](https://github.com/DataTables/DataTables)

## 🚀 Executar o Projeto

```bash
ng serve
```

Acesse `http://localhost:4200` para ver o exemplo funcionando.

---

**Nota:** Este exemplo demonstra uma implementação completa e funcional do DataTables com FixedColumns no Angular 18. A tabela inclui scroll horizontal, coluna fixa, paginação, busca e ordenação.
