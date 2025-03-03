import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  standalone: false,

  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  ngOnInit(): void {
    if(!this.url) throw new Error('url is required');
  }

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  onLoad() {
    this.hasLoaded = true;
  }
}
