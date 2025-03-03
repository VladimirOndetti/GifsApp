import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  standalone: false,

  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {};

  searchTag( ):void {
    const newTag = this.tagInput.nativeElement.value;

    if(newTag === '') return;

    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
