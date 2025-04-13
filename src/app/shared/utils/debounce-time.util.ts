import { signal, effect } from '@angular/core';

export function debounceTime<T>(sourceSignal: () => T, delay: number) {
  const debounced = signal(sourceSignal());
  let timer: ReturnType<typeof setTimeout>;

  effect(() => {
    clearTimeout(timer);
    const value = sourceSignal();
    timer = setTimeout(() => debounced.set(value), delay);
  });

  return debounced;
}
