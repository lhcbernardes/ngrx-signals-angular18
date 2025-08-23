import { Component } from '@angular/core';
import { UserFormComponent, UserData } from './user-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form-example',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  template: `
    <div class="example-container">
      <h1>Exemplos de Uso do User Form</h1>
      
      <div class="example-section">
        <h2>1. Formulário com Dados de Exemplo (Padrão)</h2>
        <p>Este formulário carrega automaticamente dados de exemplo para demonstração.</p>
        <app-user-form></app-user-form>
      </div>

      <div class="example-section">
        <h2>2. Formulário em Modo de Edição</h2>
        <p>Este formulário está em modo de edição e não limpa os dados após envio.</p>
        <app-user-form [isEditMode]="true"></app-user-form>
      </div>

      <div class="example-section">
        <h2>3. Formulário com Dados Pré-preenchidos</h2>
        <p>Este formulário recebe dados específicos via Input.</p>
        <app-user-form 
          [initialData]="customUserData" 
          [isEditMode]="true">
        </app-user-form>
      </div>

      <div class="example-section">
        <h2>4. Formulário Vazio</h2>
        <p>Este formulário inicia vazio (sem dados de exemplo).</p>
        <button (click)="toggleEmptyForm()" class="toggle-btn">
          {{ showEmptyForm ? 'Ocultar' : 'Mostrar' }} Formulário Vazio
        </button>
        <app-user-form 
          *ngIf="showEmptyForm"
          [initialData]="undefined">
        </app-user-form>
      </div>
    </div>
  `,
  styles: [`
    .example-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h1 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 40px;
      font-size: 2.5rem;
      font-weight: 600;
    }

    .example-section {
      margin-bottom: 50px;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 10px;
      border: 1px solid #e9ecef;
    }

    .example-section h2 {
      color: #34495e;
      margin-bottom: 15px;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .example-section p {
      color: #6c757d;
      margin-bottom: 20px;
      font-size: 1rem;
      line-height: 1.5;
    }

    .toggle-btn {
      background: #6c757d;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      margin-bottom: 20px;
    }

    .toggle-btn:hover {
      background: #5a6268;
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .example-container {
        padding: 15px;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .example-section {
        padding: 20px;
      }
    }
  `]
})
export class UserFormExampleComponent {
  showEmptyForm = false;

  // Dados customizados para demonstração
  customUserData: UserData = {
    nome: 'Maria Santos Costa',
    endereco: 'Rua Augusta, 500 - Consolação - São Paulo/SP',
    email: 'maria.santos@empresa.com',
    telefone: '(11) 98765-1234',
    cpf: '987.654.321-00',
    dataNascimento: '1988-12-03',
    profissao: 'Médica Cardiologista',
    dependentes: [
      {
        nome: 'Lucas Santos Costa',
        endereco: 'Rua Augusta, 500 - Consolação - São Paulo/SP',
        email: 'lucas.santos@email.com',
        telefone: '(11) 91234-5678',
        cpf: '123.456.789-00',
        dataNascimento: '2013-05-18',
        parentesco: 'Filho'
      },
      {
        nome: 'Isabela Santos Costa',
        endereco: 'Rua Augusta, 500 - Consolação - São Paulo/SP',
        email: 'isabela.santos@email.com',
        telefone: '(11) 94567-8901',
        cpf: '456.789.123-00',
        dataNascimento: '2016-09-25',
        parentesco: 'Filha'
      },
      {
        nome: 'Roberto Costa Silva',
        endereco: 'Rua Augusta, 500 - Consolação - São Paulo/SP',
        email: 'roberto.costa@email.com',
        telefone: '(11) 97890-1234',
        cpf: '789.123.456-00',
        dataNascimento: '1960-03-10',
        parentesco: 'Pai'
      }
    ]
  };

  toggleEmptyForm() {
    this.showEmptyForm = !this.showEmptyForm;
  }
}
