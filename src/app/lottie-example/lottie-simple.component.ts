import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-lottie-simple',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  template: `
    <div class="simple-container">
      <h2>Lottie Simple Test</h2>
      
      <!-- Test 1: Simple Circle -->
      <div class="test-item">
        <h3>Test 1: Simple Circle</h3>
        <ng-lottie
          [options]="simpleCircleOptions"
          [styles]="styles"
          (animationCreated)="onAnimationCreated($event)"
          (error)="onError($event)">
        </ng-lottie>
        <p>Status: {{ status }}</p>
      </div>

      <!-- Test 2: Loading Spinner -->
      <div class="test-item">
        <h3>Test 2: Loading Spinner</h3>
        <ng-lottie
          [options]="spinnerOptions"
          [styles]="styles"
          (animationCreated)="onSpinnerCreated($event)"
          (error)="onSpinnerError($event)">
        </ng-lottie>
        <p>Status: {{ spinnerStatus }}</p>
      </div>

      <!-- Test 3: File-based Animation -->
      <div class="test-item">
        <h3>Test 3: File-based Animation</h3>
        <ng-lottie
          [options]="fileOptions"
          [styles]="styles"
          (animationCreated)="onFileCreated($event)"
          (error)="onFileError($event)">
        </ng-lottie>
        <p>Status: {{ fileStatus }}</p>
      </div>
    </div>
  `,
  styles: [`
    .simple-container {
      padding: 20px;
      text-align: center;
    }
    
    .test-item {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    
    .test-item h3 {
      margin-bottom: 15px;
      color: #333;
    }
    
    .test-item p {
      margin-top: 10px;
      font-weight: bold;
    }
  `]
})
export class LottieSimpleComponent {
  status = 'Not started';
  spinnerStatus = 'Not started';
  fileStatus = 'Not started';

  // Simple circle animation (inline)
  simpleCircleOptions: any = {
    animationData: {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 60,
      "w": 100,
      "h": 100,
      "nm": "Simple Circle",
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
                  "c": { "a": 0, "k": [1, 0, 0, 1], "ix": 4 },
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

  // Spinner animation (inline)
  spinnerOptions: any = {
    animationData: {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 60,
      "w": 100,
      "h": 100,
      "nm": "Spinner",
      "ddd": 0,
      "assets": [],
      "layers": [
        {
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Spinner",
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
                  "s": { "a": 0, "k": [40, 40], "ix": 2 },
                  "p": { "a": 0, "k": [0, 0], "ix": 3 },
                  "nm": "Ellipse Path 1",
                  "mn": "ADBE Vector Shape - Ellipse",
                  "hd": false
                },
                {
                  "ty": "st",
                  "c": { "a": 0, "k": [0, 0, 1, 1], "ix": 3 },
                  "o": { "a": 0, "k": 100, "ix": 4 },
                  "w": { "a": 0, "k": 4, "ix": 5 },
                  "lc": 2,
                  "lj": 1,
                  "ml": 4,
                  "bm": 0,
                  "nm": "Stroke 1",
                  "mn": "ADBE Vector Graphic - Stroke",
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

  // File-based animation
  fileOptions: any = {
    path: '/assets/animations/simple-circle.json',
    loop: true,
    autoplay: true
  };

  styles: Partial<CSSStyleDeclaration> = {
    width: '100px',
    height: '100px',
    margin: '0 auto'
  };

  onAnimationCreated(animation: any): void {
    console.log('Simple circle animation created:', animation);
    this.status = 'Created and playing';
  }

  onError(error: any): void {
    console.error('Simple circle error:', error);
    this.status = 'Error occurred';
  }

  onSpinnerCreated(animation: any): void {
    console.log('Spinner animation created:', animation);
    this.spinnerStatus = 'Created and playing';
  }

  onSpinnerError(error: any): void {
    console.error('Spinner error:', error);
    this.spinnerStatus = 'Error occurred';
  }

  onFileCreated(animation: any): void {
    console.log('File animation created:', animation);
    this.fileStatus = 'Created and playing';
  }

  onFileError(error: any): void {
    console.error('File error:', error);
    this.fileStatus = 'Error occurred';
  }
}
