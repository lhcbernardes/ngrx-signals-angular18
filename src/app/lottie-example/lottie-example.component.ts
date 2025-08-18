import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie-example',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  template: `
    <div class="lottie-container">
      <h2>Lottie Animation Example</h2>
      
      <!-- Basic Lottie animation -->
      <div class="animation-wrapper">
        <h3>Basic Animation</h3>
        <ng-lottie
          [options]="options"
          [styles]="styles"
          (animationCreated)="onAnimate($event)">
        </ng-lottie>
      </div>

      <!-- Controlled animation -->
      <div class="animation-wrapper">
        <h3>Controlled Animation</h3>
        <ng-lottie
          [options]="controlledOptions"
          [styles]="styles"
          (animationCreated)="onControlledAnimate($event)">
        </ng-lottie>
        <div class="controls">
          <button (click)="play()">Play</button>
          <button (click)="pause()">Pause</button>
          <button (click)="stop()">Stop</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .lottie-container {
      padding: 20px;
      text-align: center;
    }

    .animation-wrapper {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .controls {
      margin-top: 10px;
    }

    .controls button {
      margin: 0 5px;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .controls button:hover {
      background-color: #0056b3;
    }
  `]
})
export class LottieExampleComponent {
  // Basic animation options
  options: AnimationOptions = {
    path: '/assets/animations/example.json', // You'll need to add your Lottie JSON file
    loop: true,
    autoplay: true
  };

  // Controlled animation options
  controlledOptions: AnimationOptions = {
    path: '/assets/animations/example.json', // You'll need to add your Lottie JSON file
    loop: true,
    autoplay: false
  };

  // Styles for the animation container
  styles: Partial<CSSStyleDeclaration> = {
    width: '300px',
    height: '300px',
    margin: '0 auto'
  };

  // Animation instance for controlled playback
  private animation: any;

  onAnimate(animation: any): void {
    console.log('Basic animation created:', animation);
  }

  onControlledAnimate(animation: any): void {
    this.animation = animation;
    console.log('Controlled animation created:', animation);
  }

  play(): void {
    if (this.animation) {
      this.animation.play();
    }
  }

  pause(): void {
    if (this.animation) {
      this.animation.pause();
    }
  }

  stop(): void {
    if (this.animation) {
      this.animation.stop();
    }
  }
}
