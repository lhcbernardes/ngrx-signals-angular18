# Guia do User Form Component

## Visão Geral

O `UserFormComponent` é um formulário rico e responsivo para cadastro de usuários com suporte a dados pré-preenchidos, validações avançadas e gerenciamento de dependentes.

## Características Principais

- ✅ **Dados Pré-preenchidos**: Suporte a carregamento de dados iniciais
- ✅ **Modo de Edição**: Diferentes comportamentos para criação/edição
- ✅ **Validações Avançadas**: CPF, email, telefone com padrões brasileiros
- ✅ **Validação Inteligente**: Não mostra erros quando carrega dados válidos
- ✅ **Dependentes Dinâmicos**: Adicionar/remover dependentes em tempo real
- ✅ **Interface Responsiva**: Design moderno e adaptável
- ✅ **Feedback Visual**: Mensagens de erro e sucesso
- ✅ **Dados de Exemplo**: Carregamento automático para demonstração

## Estrutura de Dados

### Interface UserData

```typescript
export interface UserData {
  nome: string;           // Nome completo (obrigatório)
  endereco: string;       // Endereço completo (obrigatório)
  email: string;          // Email (obrigatório)
  telefone?: string;      // Telefone (opcional)
  cpf?: string;           // CPF (opcional)
  dataNascimento?: string; // Data de nascimento (opcional)
  profissao?: string;     // Profissão (opcional)
  dependentes: DependenteData[]; // Array de dependentes
}
```

### Interface DependenteData

```typescript
export interface DependenteData {
  nome: string;           // Nome completo (obrigatório)
  endereco: string;       // Endereço (obrigatório)
  email: string;          // Email (obrigatório)
  telefone?: string;      // Telefone (opcional)
  cpf?: string;           // CPF (opcional)
  dataNascimento?: string; // Data de nascimento (opcional)
  parentesco?: string;    // Parentesco (opcional)
}
```

## Como Usar

### 1. Uso Básico (com dados de exemplo)

```html
<app-user-form></app-user-form>
```

### 2. Modo de Edição

```html
<app-user-form [isEditMode]="true"></app-user-form>
```

### 3. Com Dados Pré-preenchidos

```typescript
// No componente pai
userData: UserData = {
  nome: 'João Silva',
  endereco: 'Rua das Flores, 123 - São Paulo/SP',
  email: 'joao@email.com',
  telefone: '(11) 99999-8888',
  cpf: '123.456.789-00',
  dataNascimento: '1985-03-15',
  profissao: 'Desenvolvedor',
  dependentes: [
    {
      nome: 'Maria Silva',
      endereco: 'Rua das Flores, 123 - São Paulo/SP',
      email: 'maria@email.com',
      telefone: '(11) 88888-7777',
      cpf: '987.654.321-00',
      dataNascimento: '2010-07-22',
      parentesco: 'Filha'
    }
  ]
};
```

```html
<app-user-form 
  [initialData]="userData" 
  [isEditMode]="true">
</app-user-form>
```

### 4. Formulário Vazio

```html
<app-user-form [initialData]="undefined"></app-user-form>
```

## Inputs Disponíveis

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `initialData` | `UserData \| undefined` | `undefined` | Dados iniciais para preencher o formulário |
| `isEditMode` | `boolean` | `false` | Se true, não limpa o formulário após envio |

## Funcionalidades

### Validações

- **Nome**: Obrigatório
- **Email**: Obrigatório e formato válido
- **Endereço**: Obrigatório
- **CPF**: Formato 000.000.000-00 (se preenchido)
- **Telefone**: Formato (00) 00000-0000 (se preenchido)

#### Comportamento da Validação

- **Dados Pré-preenchidos**: Quando o formulário carrega dados válidos, não mostra mensagens de erro
- **Validação em Tempo Real**: Mostra erros apenas quando o usuário interage com o campo ou submete o formulário
- **Reset Inteligente**: Ao limpar ou recarregar dados, reseta o estado de validação
- **Modo de Edição**: Mantém dados após envio bem-sucedido, mas reseta validações

### Botões de Ação

- **Enviar/Atualizar**: Submete o formulário
- **Limpar Formulário**: Remove todos os dados
- **Carregar Dados de Exemplo**: Recarrega dados de demonstração
- **Adicionar Dependente**: Adiciona novo dependente
- **Remover Dependente**: Remove dependente específico

### Estados do Formulário

- **Carregamento**: Mostra "Enviando..." durante submissão
- **Sucesso**: Exibe mensagem de sucesso
- **Erro**: Exibe mensagens de validação apenas quando necessário
- **Modo Edição**: Não limpa dados após envio
- **Dados Pré-preenchidos**: Não mostra validações quando carrega dados válidos

## Exemplos de Uso

### Cenário 1: Cadastro de Novo Usuário

```typescript
// Componente pai
export class CadastroComponent {
  onSubmit(userData: UserData) {
    this.userService.createUser(userData).subscribe(response => {
      console.log('Usuário criado:', response);
    });
  }
}
```

```html
<app-user-form (onSubmit)="onSubmit($event)"></app-user-form>
```

### Cenário 2: Edição de Usuário Existente

```typescript
// Componente pai
export class EdicaoComponent implements OnInit {
  userData: UserData;

  ngOnInit() {
    this.userService.getUser(123).subscribe(data => {
      this.userData = data;
    });
  }
}
```

```html
<app-user-form 
  [initialData]="userData" 
  [isEditMode]="true">
</app-user-form>
```

### Cenário 3: Formulário com Dados de API

```typescript
// Componente pai
export class FormularioComponent implements OnInit {
  userData: UserData;

  ngOnInit() {
    // Carrega dados de uma API
    this.userService.loadSampleData().subscribe(data => {
      this.userData = data;
    });
  }
}
```

```html
<app-user-form [initialData]="userData"></app-user-form>
```

## Service Methods

O `UserFormService` oferece os seguintes métodos:

```typescript
// Enviar formulário
submitForm(data: UserData): Observable<any>

// Carregar dados de exemplo
loadSampleData(): Observable<UserData>

// Carregar dados de usuário específico
loadUserData(userId: number): Observable<UserData>

// Atualizar usuário
updateUser(userId: number, data: UserData): Observable<any>

// Criar novo usuário
createUser(data: UserData): Observable<any>

// Validar CPF
validateCPF(cpf: string): Observable<boolean>

// Validar email
validateEmail(email: string): Observable<boolean>
```

## Estilização

O componente usa CSS moderno com:

- **Grid Layout**: Para organização responsiva
- **Flexbox**: Para alinhamento de elementos
- **CSS Variables**: Para consistência de cores
- **Media Queries**: Para responsividade
- **Transições**: Para animações suaves

### Classes CSS Principais

- `.form-section`: Seções do formulário
- `.form-row`: Linhas com grid de 2 colunas
- `.form-group`: Grupos de campos
- `.dependente-item`: Itens de dependentes
- `.btn-submit`, `.btn-clear`, `.btn-sample`: Botões de ação
- `.error-message`: Mensagens de erro
- `.response-message`: Mensagens de resposta

## Rotas Disponíveis

- `/user-form`: Formulário básico
- `/user-form-example`: Exemplos de uso

## Dependências

- Angular Forms (ReactiveFormsModule)
- Angular Common
- RxJS (para observables)

## Considerações de Performance

- O componente usa `OnPush` change detection strategy
- Validações são aplicadas apenas quando necessário
- Dados são carregados de forma assíncrona
- Interface responsiva para diferentes dispositivos
