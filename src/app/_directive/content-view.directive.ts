import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";

@Directive({ selector: "[appContentView]" })
export class ContentViewDirective {
  private hasBeenVisible: boolean = false;
  private intersectionOptions: any = {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.5, 1],
  };

  @Output("elementVisible") public elementVisible = new EventEmitter<boolean>();
  @Input("isTargetElement") public isTargetElement: boolean;

  constructor(private element: ElementRef) {}

  public ngAfterViewInit(): void {
    let observer = new IntersectionObserver(
      this.intersectionCallback.bind(this),
      this.intersectionOptions
    );
    if (this.isTargetElement) observer.observe(this.element.nativeElement);
  }

  private intersectionCallback(entries: any, observer: any): void {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting && !this.hasBeenVisible) {
        this.elementVisible.emit(true);
        this.hasBeenVisible = true;
      }
    });
  }
}