# NGX-Lottie Guide for Angular 19

## Installation

The packages have been successfully installed:
- `lottie-web`: The core Lottie library
- `ngx-lottie@13.0.1`: Angular wrapper for Lottie (compatible with Angular 19)

## Basic Usage

### 1. Import the LottieComponent

```typescript
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  // ... rest of component
})
```

### 2. Basic Animation

```html
<ng-lottie
  [options]="options"
  [styles]="styles"
  (animationCreated)="onAnimate($event)">
</ng-lottie>
```

```typescript
export class MyComponent {
  options: AnimationOptions = {
    path: '/assets/animations/my-animation.json',
    loop: true,
    autoplay: true
  };

  styles: Partial<CSSStyleDeclaration> = {
    width: '300px',
    height: '300px'
  };

  onAnimate(animation: any): void {
    console.log('Animation created:', animation);
  }
}
```

## Advanced Usage

### 1. Controlled Animation

```html
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
```

```typescript
export class MyComponent {
  private animation: any;

  controlledOptions: AnimationOptions = {
    path: '/assets/animations/my-animation.json',
    loop: true,
    autoplay: false // Don't autoplay for controlled animation
  };

  onControlledAnimate(animation: any): void {
    this.animation = animation;
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
```

### 2. Animation Options

```typescript
interface AnimationOptions {
  path?: string;           // Path to Lottie JSON file
  loop?: boolean;          // Whether to loop the animation
  autoplay?: boolean;      // Whether to autoplay
  name?: string;           // Name for the animation
  renderer?: string;       // 'svg', 'canvas', or 'html'
  rendererSettings?: any;  // Renderer-specific settings
}
```

### 3. Event Handling

```html
<ng-lottie
  [options]="options"
  (animationCreated)="onCreated($event)"
  (complete)="onComplete($event)"
  (loopComplete)="onLoopComplete($event)"
  (enterFrame)="onEnterFrame($event)"
  (segmentStart)="onSegmentStart($event)"
  (destroy)="onDestroy($event)"
  (error)="onError($event)">
</ng-lottie>
```

```typescript
export class MyComponent {
  onCreated(animation: any): void {
    console.log('Animation created');
  }

  onComplete(animation: any): void {
    console.log('Animation completed');
  }

  onLoopComplete(animation: any): void {
    console.log('Loop completed');
  }

  onEnterFrame(animation: any): void {
    console.log('Entered frame');
  }

  onSegmentStart(animation: any): void {
    console.log('Segment started');
  }

  onDestroy(animation: any): void {
    console.log('Animation destroyed');
  }

  onError(error: any): void {
    console.error('Animation error:', error);
  }
}
```

## Getting Lottie Animations

### 1. LottieFiles
Visit [LottieFiles](https://lottiefiles.com/) to find free animations.

### 2. Adobe After Effects
Create animations in After Effects and export as Lottie JSON.

### 3. Online Lottie Editors
Use online tools like:
- [LottieFlow](https://lottieflow.com/)
- [Rive](https://rive.app/)

## Best Practices

### 1. Performance
- Use `renderer: 'svg'` for better performance with complex animations
- Avoid too many simultaneous animations
- Consider using `autoplay: false` for animations below the fold

### 2. File Organization
```
src/
  assets/
    animations/
      loading.json
      success.json
      error.json
```

### 3. Responsive Design
```typescript
styles: Partial<CSSStyleDeclaration> = {
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  aspectRatio: '1'
};
```

### 4. Error Handling
```typescript
onError(error: any): void {
  console.error('Lottie animation failed to load:', error);
  // Show fallback content or retry logic
}
```

## Troubleshooting

### Common Issues

1. **Animation not loading**
   - Check the path to your JSON file
   - Ensure the JSON file is valid
   - Check browser console for errors

2. **Animation not playing**
   - Verify `autoplay: true` is set
   - Check if the animation is visible in the viewport
   - Ensure the component is properly initialized

3. **Performance issues**
   - Reduce animation complexity
   - Use `renderer: 'svg'` instead of 'canvas'
   - Consider pausing animations when not visible

### Debug Mode
```typescript
options: AnimationOptions = {
  path: '/assets/animations/my-animation.json',
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
```

## Example Implementation

The project now includes a working example in `src/app/lottie-example/lottie-example.component.ts` that demonstrates:
- Basic animation playback
- Controlled animation with play/pause/stop
- Event handling
- Styling and layout

To test the implementation:
1. Run `npm start`
2. Navigate to your application
3. You should see the Lottie animation examples

## Additional Resources

- [ngx-lottie Documentation](https://github.com/ngx-lottie/ngx-lottie)
- [Lottie Web Documentation](https://github.com/airbnb/lottie-web)
- [LottieFiles Community](https://lottiefiles.com/)
- [Adobe Lottie Documentation](https://airbnb.design/lottie/)
