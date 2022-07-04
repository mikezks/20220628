import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { delay, distinctUntilChanged, map, of, Subject, switchMap } from 'rxjs';

@Pipe({
  name: 'translateAsync',
  pure: false
})
export class TranslateAsyncPipe<T> implements PipeTransform, OnDestroy {
  private asyncPipe = new AsyncPipe(inject(ChangeDetectorRef));
  private pushValue$ = new Subject<T>();
  private asyncTranslation$ = this.pushValue$.pipe(
    distinctUntilChanged(),
    switchMap(v => this.dataAccessStream$.translateValue(v))
  );
  private dataAccessStream$ = {
    translateValue: (value: T) => of(value).pipe(
      delay(1_000),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map(v => v + ' my translated value' as any)
    )
  };

  transform(value: T): T | null {
    this.pushValue$.next(value);
    return this.asyncPipe.transform(this.asyncTranslation$);
  }

  ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }
}
