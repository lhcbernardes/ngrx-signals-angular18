import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFormService } from '../service/user-form.service';
import { CommonModule } from '@angular/common';

// Interface para definir a estrutura dos dados do usuário
export interface UserData {
  nome: string;
  endereco: string;
  email: string;
  telefone?: string;
  cpf?: string;
  dataNascimento?: string;
  profissao?: string;
  dependentes: DependenteData[];
}

export interface DependenteData {
  nome: string;
  endereco: string;
  email: string;
  telefone?: string;
  cpf?: string;
  dataNascimento?: string;
  parentesco?: string;
}

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  @Input() initialData?: UserData; // Dados iniciais opcionais
  @Input() isEditMode: boolean = false; // Modo de edição
  
  userForm: FormGroup;
  submitted = false;
  responseMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private userService: UserFormService) {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)],
      cpf: ['', Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)],
      dataNascimento: [''],
      profissao: [''],
      dependentes: this.fb.array([])
    });
  }

  ngOnInit() {
    // Reseta o estado de validação no início
    this.submitted = false;
    this.responseMessage = '';
    
    if (this.initialData) {
      this.loadInitialData(this.initialData);
    } else {
      // Carrega dados de exemplo se não houver dados iniciais
      this.loadSampleData();
    }
  }

  // Carrega dados iniciais no formulário
  loadInitialData(data: UserData) {
    // Reseta o estado de validação antes de carregar os dados
    this.submitted = false;
    this.responseMessage = '';
    
    // Carrega os dados no formulário
    this.userForm.patchValue({
      nome: data.nome,
      endereco: data.endereco,
      email: data.email,
      telefone: data.telefone || '',
      cpf: data.cpf || '',
      dataNascimento: data.dataNascimento || '',
      profissao: data.profissao || ''
    });

    // Carrega dependentes
    this.dependentes.clear();
    if (data.dependentes && data.dependentes.length > 0) {
      data.dependentes.forEach(dep => {
        this.dependentes.push(this.criarDependente(dep));
      });
    }

    // Reseta o estado de validação do formulário
    // Isso garante que não apareçam mensagens de erro quando carregamos dados válidos
    this.userForm.markAsUntouched();
    this.userForm.markAsPristine();
    
    // Força a validação sem marcar como submitted
    this.userForm.updateValueAndValidity({ onlySelf: true, emitEvent: false });
  }

  // Carrega dados de exemplo para demonstração
  loadSampleData() {
    const sampleData: UserData = {
      nome: 'João Silva Santos',
      endereco: 'Rua das Flores, 123 - Centro - São Paulo/SP',
      email: 'joao.silva@email.com',
      telefone: '(11) 99999-8888',
      cpf: '123.456.789-00',
      dataNascimento: '1985-03-15',
      profissao: 'Desenvolvedor de Software',
      dependentes: [
        {
          nome: 'Maria Silva Santos',
          endereco: 'Rua das Flores, 123 - Centro - São Paulo/SP',
          email: 'maria.silva@email.com',
          telefone: '(11) 88888-7777',
          cpf: '987.654.321-00',
          dataNascimento: '2010-07-22',
          parentesco: 'Filha'
        },
        {
          nome: 'Pedro Silva Santos',
          endereco: 'Rua das Flores, 123 - Centro - São Paulo/SP',
          email: 'pedro.silva@email.com',
          telefone: '(11) 77777-6666',
          cpf: '456.789.123-00',
          dataNascimento: '2015-11-08',
          parentesco: 'Filho'
        }
      ]
    };

    this.loadInitialData(sampleData);
  }

  // Getter para o array de dependentes
  get dependentes(): FormArray {
    return this.userForm.get('dependentes') as FormArray;
  }

  // Cria um dependente com dados opcionais
  criarDependente(data?: DependenteData): FormGroup {
    return this.fb.group({
      nome: [data?.nome || '', Validators.required],
      endereco: [data?.endereco || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      telefone: [data?.telefone || '', Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)],
      cpf: [data?.cpf || '', Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)],
      dataNascimento: [data?.dataNascimento || ''],
      parentesco: [data?.parentesco || '']
    });
  }

  // Adiciona dependente
  adicionarDependente() {
    this.dependentes.push(this.criarDependente());
  }

  // Remove dependente
  removerDependente(i: number) {
    this.dependentes.removeAt(i);
  }

  // Enviar formulário
  onSubmit() {
    this.submitted = true;
    
    if (this.userForm.valid) {
      this.isLoading = true;
      this.userService.submitForm(this.userForm.value).subscribe((res: any) => {
        this.responseMessage = res.message;
        this.isLoading = false;
        
        if (!this.isEditMode) {
          // Em modo de criação, limpa o formulário após sucesso
          this.userForm.reset();
          this.dependentes.clear();
          this.submitted = false;
          this.userForm.markAsUntouched();
          this.userForm.markAsPristine();
        } else {
          // Em modo de edição, mantém os dados mas reseta o estado de validação
          this.submitted = false;
        }
      });
    } else {
      // Se o formulário é inválido, mantém submitted = true para mostrar os erros
      console.log('Formulário inválido:', this.userForm.errors);
    }
  }

  // Limpar formulário
  limparFormulario() {
    this.userForm.reset();
    this.dependentes.clear();
    this.submitted = false;
    this.responseMessage = '';
    
    // Reseta o estado de validação do formulário
    this.userForm.markAsUntouched();
    this.userForm.markAsPristine();
  }

  // Recarregar dados de exemplo
  recarregarDadosExemplo() {
    // Reseta o estado de validação antes de recarregar
    this.submitted = false;
    this.responseMessage = '';
    this.loadSampleData();
  }

  // Método para validar um campo específico sem marcar o formulário como submitted
  validateField(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    if (field) {
      field.markAsTouched();
      return field.valid;
    }
    return true;
  }

  // Método para verificar se um campo tem erro (usado no template)
  hasFieldError(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? field.invalid && (field.touched || this.submitted) : false;
  }

  // Método para verificar se um campo de dependente tem erro
  hasDependenteFieldError(dependenteControl: any, fieldName: string): boolean {
    const field = dependenteControl.get(fieldName);
    return field ? field.invalid && (field.touched || this.submitted) : false;
  }
}
