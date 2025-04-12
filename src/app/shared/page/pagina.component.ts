import { Component, OnInit } from '@angular/core';
import { ListaStore } from '../store/lista.store';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './list/lista.component';

@Component({
  selector: 'app-pagina',
  imports: [CommonModule, ListaComponent],
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {
  constructor(public store: ListaStore) {}

  ngOnInit() {
    this.store.loadOptions();
  }
}
