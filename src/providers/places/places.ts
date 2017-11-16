import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  /**
   * Google developer authentication key
   * @type {string}
   */
  key: string = 'AIzaSyCXQ_oV3qikhbY2qLhE9X75TbI5VKK1coE';

  format: string = 'json';
  lat: string = '36.303025';
  lng: string = '-75.808600';
  radius: string = '20000';

  /**
   * Constructor
   * @param {HttpClient} http
   */
  constructor(public http: HttpClient) {}

  /**
   * Retrieves page of places from Google places service
   * @param next_page_token
   * @returns {Observable<any>}
   */
  getPlaces(type, next_page_token): Observable<any> {

    // generate url with parameters:
    let url:string = `maps/api/place/nearbysearch/${this.format}?location=${this.lat},${this.lng}&type=${type}&radius=${this.radius}&key=${this.key}`;

    // if previous request returned page token, add it to this request:
    if (next_page_token !== undefined) {
      url += `&pagetoken=${next_page_token}`;
    }

    return this.http.get<any>(url);
  }

  /**
   * Retrieves place details
   * @param placeid
   * @returns {Observable<any>}
   */
  getPlace(placeid): Observable<any> {
    let url:string = `maps/api/place/details/${this.format}?placeid=${placeid}&key=${this.key}`;
    return this.http.get<any>(url);
  }

  getPhoto(photoreference) {
    return `maps/api/place/photo?key=${this.key}&photoreference=${photoreference}&maxwidth=200`;
  }

}
