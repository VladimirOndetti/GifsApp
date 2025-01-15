import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gift.interface';

@Component({
  selector: 'gifs-card',
  standalone: false,

  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  ngOnInit(): void {
    if(!this.gif) throw new Error('gif not implemented.');
  }

  @Input()
  public gif!: Gif;

}
