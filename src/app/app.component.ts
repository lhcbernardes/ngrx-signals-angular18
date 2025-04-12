import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectsComponent } from './shared/page/selects.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SelectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'meu-projeto-angular18';
}
