import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import {PlacesProvider} from '../../providers/places/places';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  places = [];

  next_page_token = undefined;

  constructor(public navCtrl: NavController, private provider: PlacesProvider) {}

  /**
   * Ionic lifecycle event handler
   */
  ionViewDidLoad() {
    this.getPlaces();
  }

  /**
   * Retrieve list of places for the geography
   */
  getPlaces() {
    console.log('get-places');
    this.provider.getPlaces(this.next_page_token)
      .subscribe(response => {
        console.log('response', response);
        this.places = response.results.sort((a, b) => {return a.name - b.name});
        this.next_page_token = response.next_page_token;
      });

  }

}
