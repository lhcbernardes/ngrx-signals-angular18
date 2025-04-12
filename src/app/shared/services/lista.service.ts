import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListaService {
  constructor(private http: HttpClient) { }

  getItems(params: any) {
    const allItems = [
      { nome: 'Angular', categoria: 'Frontend', status: 'Ativo', plataforma: 'Web' },
      { nome: 'React', categoria: 'Frontend', status: 'Ativo', plataforma: 'Web' },
      { nome: 'Vue', categoria: 'Frontend', status: 'Ativo', plataforma: 'Web' },
      { nome: 'Svelte', categoria: 'Frontend', status: 'Beta', plataforma: 'Web' },
      { nome: 'Node', categoria: 'Backend', status: 'Ativo', plataforma: 'Web' },
      { nome: 'Express', categoria: 'Backend', status: 'Ativo', plataforma: 'Web' },
      { nome: 'NestJS', categoria: 'Backend', status: 'Beta', plataforma: 'Web' },
    ];

    console.log('params', params); // Log dos parâmetros recebidos

    // Retorna como se fosse uma chamada HTTP
    return of(allItems).pipe(delay(500)); // simula delay de rede
  }

  getCategorias() {
    return of(['Frontend', 'Backend', 'Fullstack']).pipe(delay(500));  // Simula um delay
  }

  getStatus() {
    return of(['Ativo', 'Beta']).pipe(delay(500));
  }

  getPlataformas() {
    return of(['Web', 'Mobile']).pipe(delay(500));
  }
}
