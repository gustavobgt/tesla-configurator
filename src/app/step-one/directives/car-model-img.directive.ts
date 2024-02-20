import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCarModelImg]',
  standalone: true,
})
export class CarModelImgDirective implements OnChanges {
  @HostBinding('src') imageSource?: string;
  @Input() carModelCode?: string | null;
  @Input() carColorCode?: string | null;

  ngOnChanges(): void {
    this.imageSource = `assets/models/${this.carModelCode}/${this.carColorCode}.jpg`;
  }
}
