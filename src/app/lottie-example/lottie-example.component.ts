import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie-example',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  template: `
    <div class="lottie-container">
      <h2>Lottie Animation Examples</h2>
      
      <!-- Debug Info -->
      <div class="debug-info" *ngIf="debugInfo">
        <h4>Debug Information:</h4>
        <p><strong>Animation Status:</strong> {{ debugInfo.status }}</p>
        <p><strong>Error:</strong> {{ debugInfo.error || 'None' }}</p>
        <p><strong>Total Animations:</strong> {{ totalAnimations }}</p>
      </div>
      
      <!-- Simple Circle Animation -->
      <div class="animation-wrapper">
        <h3>1. Simple Circle (Red)</h3>
        <ng-lottie
          [options]="simpleCircleOptions"
          [styles]="smallStyles"
          (animationCreated)="onSimpleCircleAnimate($event)"
          (error)="onSimpleCircleError($event)">
        </ng-lottie>
        <div class="animation-status">
          <p>Status: {{ simpleCircleStatus }}</p>
        </div>
      </div>

      <!-- Loading Dots Animation -->
      <div class="animation-wrapper">
        <h3>2. Loading Dots</h3>
        <ng-lottie
          [options]="loadingDotsOptions"
          [styles]="dotsStyles"
          (animationCreated)="onLoadingDotsAnimate($event)"
          (error)="onLoadingDotsError($event)">
        </ng-lottie>
        <div class="animation-status">
          <p>Status: {{ loadingDotsStatus }}</p>
        </div>
      </div>

      <!-- Controlled Spinner -->
      <div class="animation-wrapper">
        <h3>3. Controlled Spinner</h3>
        <ng-lottie
          [options]="controlledOptions"
          [styles]="styles"
          (animationCreated)="onControlledAnimate($event)"
          (error)="onControlledError($event)">
        </ng-lottie>
        <div class="controls">
          <button (click)="play()">Play</button>
          <button (click)="pause()">Pause</button>
          <button (click)="stop()">Stop</button>
          <button (click)="restart()">Restart</button>
        </div>
        <div class="animation-status">
          <p>Status: {{ controlledAnimationStatus }}</p>
        </div>
      </div>

      <!-- Inline Animation -->
      <div class="animation-wrapper">
        <h3>4. Inline Animation (Green Circle)</h3>
        <ng-lottie
          [options]="inlineOptions"
          [styles]="smallStyles"
          (animationCreated)="onInlineAnimate($event)"
          (error)="onInlineError($event)">
        </ng-lottie>
        <div class="animation-status">
          <p>Status: {{ inlineStatus }}</p>
        </div>
      </div>

      <!-- Multiple Animations -->
      <div class="animation-wrapper">
        <h3>5. Multiple Animations</h3>
        <div class="multiple-animations">
          <div class="animation-item">
            <h4>Blue Circle</h4>
            <ng-lottie
              [options]="blueCircleOptions"
              [styles]="tinyStyles"
              (animationCreated)="onBlueCircleAnimate($event)">
            </ng-lottie>
          </div>
          <div class="animation-item">
            <h4>Orange Square</h4>
            <ng-lottie
              [options]="orangeSquareOptions"
              [styles]="tinyStyles"
              (animationCreated)="onOrangeSquareAnimate($event)">
            </ng-lottie>
          </div>
          <div class="animation-item">
            <h4>Purple Triangle</h4>
            <ng-lottie
              [options]="purpleTriangleOptions"
              [styles]="tinyStyles"
              (animationCreated)="onPurpleTriangleAnimate($event)">
            </ng-lottie>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .lottie-container {
      padding: 20px;
      text-align: center;
    }

    .debug-info {
      margin: 20px 0;
      padding: 15px;
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      text-align: left;
    }

    .debug-info h4 {
      margin-top: 0;
      color: #495057;
    }

    .debug-info p {
      margin: 5px 0;
      font-size: 14px;
    }

    .animation-wrapper {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #fafafa;
    }

    .animation-wrapper h3 {
      color: #333;
      margin-bottom: 15px;
    }

    .animation-status {
      margin-top: 10px;
      padding: 8px;
      background-color: #e9ecef;
      border-radius: 4px;
      font-size: 14px;
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
      transition: background-color 0.3s ease;
    }

    .controls button:hover {
      background-color: #0056b3;
    }

    .multiple-animations {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 15px;
    }

    .animation-item {
      text-align: center;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: white;
      min-width: 120px;
    }

    .animation-item h4 {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class LottieExampleComponent {
  // Debug information
  debugInfo: any = {
    status: 'Initializing...',
    error: null
  };

  // Animation counters
  totalAnimations = 0;

  // Animation status
  simpleCircleStatus = 'Not started';
  loadingDotsStatus = 'Not started';
  controlledAnimationStatus = 'Not started';
  inlineStatus = 'Not started';

  // Simple Circle Animation
  simpleCircleOptions: any = {
    path: '/assets/animations/simple-circle.json',
    loop: true,
    autoplay: true
  };

  // Loading Dots Animation
  loadingDotsOptions: any = {
    path: '/assets/animations/loading-dots.json',
    loop: true,
    autoplay: true
  };

  // Controlled animation options
  controlledOptions: any = {
    path: '/assets/animations/loading.json',
    loop: true,
    autoplay: false
  };

  // Inline animation options (green circle)
  inlineOptions: any = {
    animationData: {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 60,
      "w": 100,
      "h": 100,
      "nm": "Green Circle",
      "ddd": 0,
      "assets": [],
      "layers": [
        {
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Circle",
          "sr": 1,
          "ks": {
            "o": { "a": 0, "k": 100, "ix": 11 },
            "r": {
              "a": 1,
              "k": [
                { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] },
                { "t": 60, "s": [360] }
              ],
              "ix": 10
            },
            "p": { "a": 0, "k": [50, 50, 0], "ix": 2 },
            "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
            "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
          },
          "ao": 0,
          "shapes": [
            {
              "ty": "gr",
              "it": [
                {
                  "d": 1,
                  "ty": "el",
                  "s": { "a": 0, "k": [30, 30], "ix": 2 },
                  "p": { "a": 0, "k": [0, 0], "ix": 3 },
                  "nm": "Ellipse Path 1",
                  "mn": "ADBE Vector Shape - Ellipse",
                  "hd": false
                },
                {
                  "ty": "fl",
                  "c": { "a": 0, "k": [0, 1, 0, 1], "ix": 4 },
                  "o": { "a": 0, "k": 100, "ix": 5 },
                  "r": 1,
                  "bm": 0,
                  "nm": "Fill 1",
                  "mn": "ADBE Vector Graphic - Fill",
                  "hd": false
                }
              ],
              "nm": "Ellipse 1",
              "np": 3,
              "cix": 2,
              "bm": 0,
              "ix": 1,
              "mn": "ADBE Vector Group",
              "hd": false
            }
          ],
          "ip": 0,
          "op": 60,
          "st": 0,
          "bm": 0
        }
      ],
      "markers": []
    },
    loop: true,
    autoplay: true
  };

  // Multiple animations options
  blueCircleOptions: any = {
    animationData: {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 60,
      "w": 80,
      "h": 80,
      "nm": "Blue Circle",
      "ddd": 0,
      "assets": [],
      "layers": [
        {
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Circle",
          "sr": 1,
          "ks": {
            "o": { "a": 0, "k": 100, "ix": 11 },
            "r": {
              "a": 1,
              "k": [
                { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] },
                { "t": 60, "s": [360] }
              ],
              "ix": 10
            },
            "p": { "a": 0, "k": [40, 40, 0], "ix": 2 },
            "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
            "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
          },
          "ao": 0,
          "shapes": [
            {
              "ty": "gr",
              "it": [
                {
                  "d": 1,
                  "ty": "el",
                  "s": { "a": 0, "k": [25, 25], "ix": 2 },
                  "p": { "a": 0, "k": [0, 0], "ix": 3 },
                  "nm": "Ellipse Path 1",
                  "mn": "ADBE Vector Shape - Ellipse",
                  "hd": false
                },
                {
                  "ty": "fl",
                  "c": { "a": 0, "k": [0, 0, 1, 1], "ix": 4 },
                  "o": { "a": 0, "k": 100, "ix": 5 },
                  "r": 1,
                  "bm": 0,
                  "nm": "Fill 1",
                  "mn": "ADBE Vector Graphic - Fill",
                  "hd": false
                }
              ],
              "nm": "Ellipse 1",
              "np": 3,
              "cix": 2,
              "bm": 0,
              "ix": 1,
              "mn": "ADBE Vector Group",
              "hd": false
            }
          ],
          "ip": 0,
          "op": 60,
          "st": 0,
          "bm": 0
        }
      ],
      "markers": []
    },
    loop: true,
    autoplay: true
  };

  orangeSquareOptions: any = {
    animationData: {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 60,
      "w": 80,
      "h": 80,
      "nm": "Orange Square",
      "ddd": 0,
      "assets": [],
      "layers": [
        {
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Square",
          "sr": 1,
          "ks": {
            "o": { "a": 0, "k": 100, "ix": 11 },
            "r": {
              "a": 1,
              "k": [
                { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] },
                { "t": 60, "s": [360] }
              ],
              "ix": 10
            },
            "p": { "a": 0, "k": [40, 40, 0], "ix": 2 },
            "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
            "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
          },
          "ao": 0,
          "shapes": [
            {
              "ty": "gr",
              "it": [
                {
                  "d": 1,
                  "ty": "rc",
                  "s": { "a": 0, "k": [30, 30], "ix": 2 },
                  "p": { "a": 0, "k": [0, 0], "ix": 3 },
                  "r": { "a": 0, "k": 5, "ix": 4 },
                  "nm": "Rectangle Path 1",
                  "mn": "ADBE Vector Shape - Rect",
                  "hd": false
                },
                {
                  "ty": "fl",
                  "c": { "a": 0, "k": [1, 0.5, 0, 1], "ix": 4 },
                  "o": { "a": 0, "k": 100, "ix": 5 },
                  "r": 1,
                  "bm": 0,
                  "nm": "Fill 1",
                  "mn": "ADBE Vector Graphic - Fill",
                  "hd": false
                }
              ],
              "nm": "Rectangle 1",
              "np": 3,
              "cix": 2,
              "bm": 0,
              "ix": 1,
              "mn": "ADBE Vector Group",
              "hd": false
            }
          ],
          "ip": 0,
          "op": 60,
          "st": 0,
          "bm": 0
        }
      ],
      "markers": []
    },
    loop: true,
    autoplay: true
  };

  purpleTriangleOptions: any = {
    animationData: {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 60,
      "w": 80,
      "h": 80,
      "nm": "Purple Triangle",
      "ddd": 0,
      "assets": [],
      "layers": [
        {
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Triangle",
          "sr": 1,
          "ks": {
            "o": { "a": 0, "k": 100, "ix": 11 },
            "r": {
              "a": 1,
              "k": [
                { "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] },
                { "t": 60, "s": [360] }
              ],
              "ix": 10
            },
            "p": { "a": 0, "k": [40, 40, 0], "ix": 2 },
            "a": { "a": 0, "k": [0, 0, 0], "ix": 1 },
            "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
          },
          "ao": 0,
          "shapes": [
            {
              "ty": "gr",
              "it": [
                {
                  "d": 1,
                  "ty": "sh",
                  "ks": {
                    "a": 0,
                    "k": {
                      "i": [[0, 0], [0, 0], [0, 0]],
                      "o": [[0, 0], [0, 0], [0, 0]],
                      "v": [[-15, 15], [15, 15], [0, -15]],
                      "c": false
                    },
                    "ix": 2
                  },
                  "nm": "Path 1",
                  "mn": "ADBE Vector Shape - Group",
                  "hd": false
                },
                {
                  "ty": "fl",
                  "c": { "a": 0, "k": [0.5, 0, 0.5, 1], "ix": 4 },
                  "o": { "a": 0, "k": 100, "ix": 5 },
                  "r": 1,
                  "bm": 0,
                  "nm": "Fill 1",
                  "mn": "ADBE Vector Graphic - Fill",
                  "hd": false
                }
              ],
              "nm": "Triangle 1",
              "np": 3,
              "cix": 2,
              "bm": 0,
              "ix": 1,
              "mn": "ADBE Vector Group",
              "hd": false
            }
          ],
          "ip": 0,
          "op": 60,
          "st": 0,
          "bm": 0
        }
      ],
      "markers": []
    },
    loop: true,
    autoplay: true
  };

  // Styles for different animation sizes
  styles: Partial<CSSStyleDeclaration> = {
    width: '300px',
    height: '300px',
    margin: '0 auto'
  };

  smallStyles: Partial<CSSStyleDeclaration> = {
    width: '150px',
    height: '150px',
    margin: '0 auto'
  };

  dotsStyles: Partial<CSSStyleDeclaration> = {
    width: '200px',
    height: '50px',
    margin: '0 auto'
  };

  tinyStyles: Partial<CSSStyleDeclaration> = {
    width: '80px',
    height: '80px',
    margin: '0 auto'
  };

  // Animation instance for controlled playback
  private animation: any;

  // Event handlers for simple circle
  onSimpleCircleAnimate(animation: any): void {
    console.log('Simple circle animation created:', animation);
    this.simpleCircleStatus = 'Created and playing';
    this.totalAnimations++;
    this.debugInfo.status = 'Simple circle loaded successfully';
  }

  onSimpleCircleError(error: any): void {
    console.error('Simple circle animation error:', error);
    this.simpleCircleStatus = 'Error occurred';
    this.debugInfo.error = error.message || 'Unknown error';
  }

  // Event handlers for loading dots
  onLoadingDotsAnimate(animation: any): void {
    console.log('Loading dots animation created:', animation);
    this.loadingDotsStatus = 'Created and playing';
    this.totalAnimations++;
  }

  onLoadingDotsError(error: any): void {
    console.error('Loading dots animation error:', error);
    this.loadingDotsStatus = 'Error occurred';
  }

  // Event handlers for controlled animation
  onControlledAnimate(animation: any): void {
    this.animation = animation;
    console.log('Controlled animation created:', animation);
    this.controlledAnimationStatus = 'Created (paused)';
    this.totalAnimations++;
  }

  onControlledError(error: any): void {
    console.error('Controlled animation error:', error);
    this.controlledAnimationStatus = 'Error occurred';
  }

  // Event handlers for inline animation
  onInlineAnimate(animation: any): void {
    console.log('Inline animation created:', animation);
    this.inlineStatus = 'Created and playing';
    this.totalAnimations++;
  }

  onInlineError(error: any): void {
    console.error('Inline animation error:', error);
    this.inlineStatus = 'Error occurred';
  }

  // Event handlers for multiple animations
  onBlueCircleAnimate(animation: any): void {
    console.log('Blue circle animation created:', animation);
    this.totalAnimations++;
  }

  onOrangeSquareAnimate(animation: any): void {
    console.log('Orange square animation created:', animation);
    this.totalAnimations++;
  }

  onPurpleTriangleAnimate(animation: any): void {
    console.log('Purple triangle animation created:', animation);
    this.totalAnimations++;
  }

  // Control methods
  play(): void {
    if (this.animation) {
      this.animation.play();
      this.controlledAnimationStatus = 'Playing';
    }
  }

  pause(): void {
    if (this.animation) {
      this.animation.pause();
      this.controlledAnimationStatus = 'Paused';
    }
  }

  stop(): void {
    if (this.animation) {
      this.animation.stop();
      this.controlledAnimationStatus = 'Stopped';
    }
  }

  restart(): void {
    if (this.animation) {
      this.animation.goToAndPlay(0);
      this.controlledAnimationStatus = 'Restarted';
    }
  }
}
