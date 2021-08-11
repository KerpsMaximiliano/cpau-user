import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { LoadingScreenService } from '@app/_services/loading.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements AfterViewInit, OnDestroy {

  debounceTime = 200;
  loading = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService,
              private _elmRef: ElementRef,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(debounceTime(this.debounceTime)).subscribe(
      (status: boolean) => {
        this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this._changeDetectorRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}