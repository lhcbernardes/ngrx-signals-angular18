import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="nav-menu">
      <div class="nav-container">
        <h1>Meu Projeto Angular 18</h1>
        <ul class="nav-links">
          <li><a routerLink="/datatable" routerLinkActive="active">DataTable</a></li>
          <li><a routerLink="/user-form" routerLinkActive="active">User Form</a></li>
          <li><a routerLink="/lottie" routerLinkActive="active">Lottie Animations</a></li>
          <li><a routerLink="/lottie-simple" routerLinkActive="active">Lottie Simple</a></li>
          <li><a routerLink="/formly" routerLinkActive="active">Formly Examples</a></li>
          <li><a routerLink="/dynamic-form" routerLinkActive="active">Dynamic Forms</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .nav-menu {
      background: #2c3e50;
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .nav-container h1 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
      font-weight: 300;
    }
    
    .nav-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .nav-links li a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
    
    .nav-links li a:hover {
      background-color: #34495e;
    }
    
    .nav-links li a.active {
      background-color: #3498db;
    }
    
    @media (max-width: 768px) {
      .nav-links {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class NavMenuComponent {}
