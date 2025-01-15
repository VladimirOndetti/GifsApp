import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gift.interface';

const apiKey: string = 'rUUtyLi7hNrPNX29AIILW4EnifiLVuMB';
const queryLimit: string = '10';
const serviceUrl: string = 'https://api.giphy.com/v1/gifs'

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _tagsHistory: string[] = [];
  public giftList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gif Service')
   }

  get tagHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string):void {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag => oldTag !== tag))
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag( tag: string):void {
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', apiKey)
      .set('limit', queryLimit)
      .set('q', tag)

    this.http.get<SearchResponse>(`${serviceUrl}/search`, {params})
      .subscribe((resp) => {
        this.giftList = resp.data;
      });
  }
}
