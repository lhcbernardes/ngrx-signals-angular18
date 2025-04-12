import { Component, OnInit } from '@angular/core';
import { SelectsStore } from '../store/selects.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selects',
  imports: [CommonModule],
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.scss']
})
export class SelectsComponent implements OnInit {
  constructor(public store: SelectsStore) {}

  ngOnInit() {
    this.store.loadOptions();
  }
}
