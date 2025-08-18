import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LottieExampleComponent } from './lottie-example/lottie-example.component';
import { FormlyExampleComponent } from './formly-example/formly-example.component';
import { DynamicFormComponent } from './formly-example/dynamic-form.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LottieExampleComponent, FormlyExampleComponent, DynamicFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'meu-projeto-angular18';
  
  activeTab = 'lottie';
  
  tabs = [
    { id: 'lottie', name: 'Lottie Animations' },
    { id: 'formly', name: 'Formly Examples' },
    { id: 'dynamic', name: 'Dynamic Forms' }
  ];
}
