import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { UserData, DependenteData } from '../user-form/user-form.component';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  constructor() {}

  // Simula o recebimento/envio de dados para o backend
  submitForm(data: UserData): Observable<any> {
    console.log('Dados recebidos pelo service:', data);
    return of({ success: true, message: 'Formulário recebido com sucesso!' }).pipe(delay(1000));
  }

  // Simula carregamento de dados de exemplo
  loadSampleData(): Observable<UserData> {
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

    return of(sampleData).pipe(delay(500));
  }

  // Simula carregamento de dados de um usuário existente
  loadUserData(userId: number): Observable<UserData> {
    const userData: UserData = {
      nome: 'Ana Costa Oliveira',
      endereco: 'Av. Paulista, 1000 - Bela Vista - São Paulo/SP',
      email: 'ana.costa@email.com',
      telefone: '(11) 98765-4321',
      cpf: '111.222.333-44',
      dataNascimento: '1990-08-20',
      profissao: 'Advogada',
      dependentes: [
        {
          nome: 'Carlos Costa Oliveira',
          endereco: 'Av. Paulista, 1000 - Bela Vista - São Paulo/SP',
          email: 'carlos.costa@email.com',
          telefone: '(11) 91234-5678',
          cpf: '555.666.777-88',
          dataNascimento: '2012-04-15',
          parentesco: 'Filho'
        }
      ]
    };

    return of(userData).pipe(delay(800));
  }

  // Simula atualização de dados
  updateUser(userId: number, data: UserData): Observable<any> {
    console.log('Atualizando usuário ID:', userId, 'com dados:', data);
    return of({ success: true, message: 'Usuário atualizado com sucesso!' }).pipe(delay(1000));
  }

  // Simula criação de novo usuário
  createUser(data: UserData): Observable<any> {
    console.log('Criando novo usuário com dados:', data);
    return of({ success: true, message: 'Usuário criado com sucesso!', id: Math.floor(Math.random() * 1000) }).pipe(delay(1000));
  }

  // Simula validação de CPF
  validateCPF(cpf: string): Observable<boolean> {
    // Simula validação de CPF
    const isValid = cpf.replace(/\D/g, '').length === 11;
    return of(isValid).pipe(delay(300));
  }

  // Simula validação de email
  validateEmail(email: string): Observable<boolean> {
    // Simula validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return of(isValid).pipe(delay(200));
  }
}
