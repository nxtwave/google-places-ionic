import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {PlacesProvider} from '../../providers/places/places';

import {PlacePage} from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home-cards.html'
})
export class HomePage {

  /**
   * The list of places retrieved for display
   * @type {Array}
   */
  places = [];

  /**
   * Google places token for next page of results
   * @type {any}
   */
  next_page_token = undefined;

  /**
   * Constructor
   * @param {NavController} navCtrl
   * @param {PlacesProvider} provider
   */
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
    this.provider.getPlaces('', this.next_page_token)
      .subscribe(response => {
        console.log('response', response);
        this.places = response.results;
        this.next_page_token = response.next_page_token;
      });
  }

  /**
   *
   * @param event
   * @param placeid
   */
  itemTapped(event, placeid) {
    console.log('item-tapped');
    this.navCtrl.push(PlacePage, {
      placeid: placeid
    });
  }


}
