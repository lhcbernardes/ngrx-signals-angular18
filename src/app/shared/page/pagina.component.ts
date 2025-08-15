import { Component, OnInit } from '@angular/core';
import { ListaStore } from '../store/lista.store';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './list/lista.component';
import { PageComponent } from "./page/page.component";
import { FixColumnsComponent } from "../component/fix-columns/fix-columns.component";

@Component({
  selector: 'app-pagina',
  imports: [CommonModule, ListaComponent, PageComponent, FixColumnsComponent],
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {
  constructor(public store: ListaStore) {}

  ngOnInit() {
    // this.store.loadOptions();
    // this.store.setNomes(this.meusNomes);
  }

  alternar() {
    this.store.alternarValor();
  }
}
