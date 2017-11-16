import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {PlacesProvider} from '../../providers/places/places';
import {updateAppNgModuleWithDeepLinkConfig} from "@ionic/app-scripts/dist/deep-linking/util";

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  placeid: undefined;
  place = undefined;
  photos = undefined;

  photoIndex = 0;

  /**
   *
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {PlacesProvider} provider
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: PlacesProvider) {}

  /**
   *
   */
  ionViewDidLoad() {

    // get the place parameter:
    this.placeid = this.navParams.get('placeid');

    // retrieve place details:
    this.provider.getPlace(this.placeid)
      .subscribe(response => {
        this.place = response.result;

        // create photo urls:
        if (this.place.photos) {
          this.photos = this.place.photos.map(item => {
            return this.provider.getPhoto(item.photo_reference);
          });
        }

        console.log('place', this.place);

      });
  }

  /**
   * loop thorugh photo indexes
   */
  increment() {
    var n = this.photoIndex + 1;
    if (n >= this.photos.length) {
      n = 0;
    }
    this.photoIndex = n;
  }

  decrement() {
    var n = this.photoIndex - 1;
    if (n < 0) {
      n = this.photos.length-1;
    }
    this.photoIndex = n;
  }

}
