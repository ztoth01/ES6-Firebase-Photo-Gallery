import * as firebase from 'firebase/app';
import Overlay from './Overlay';
import Ui from './Ui';

export default class FirebaseHandler {

  constructor() {

  }

  static init() {
    firebase.initializeApp({
      apiKey: "AIzaSyDD-coUm6nztvbFOcis-_jCL1JAEuRJ_ec",
      authDomain: "photo-gallery-f8671.firebaseapp.com",
      databaseURL: "https://photo-gallery-f8671.firebaseio.com",
      projectId: "photo-gallery-f8671",
      storageBucket: "photo-gallery-f8671.appspot.com",
      messagingSenderId: "211615920795"
    })
  }

  // CALLBACK
  // static getFirebaseData(cb) {
  //   firebase.database().ref('images').on('value', (data) => {
  //     cb(data.val());
  //   });
  // }

  // PROMISE
  // static getFirebaseData() {
  //   return new Promise((resolve, reject) => {
  //     firebase.database().ref('images').on('value', (data) => {
  //       if (data) {
  //         resolve(data.val());
  //       } else {
  //         reject('Opps, something went wrong!')
  //       }
  //     });
  //   })
  // }

  // Async await
  static async getFirebaseData() {
    return await new Promise((resolve, reject) => {
      firebase.database().ref('images').on('value', (data) => {
        resolve(data.val());
      });
    });
  }

  static creatImageDbKey() {
    return firebase.database().ref().child('images').push().key;
  }

  static uploadNewImageToFirebase(payload, e) {
    e.preventDefault();
    let key = this.creatImageDbKey();
    firebase.database().ref('images/' + key).set({ title: payload.title, url: '' })
      .then(() => {
        const ext = payload.image.name.slice(payload.image.name.lastIndexOf('.'));
        return firebase.storage().ref("images/" + key + '-' + payload.title + ext).put(payload.image);
      })
      .then(fileData => {
        fileData.ref.getDownloadURL()
          .then((filePath) => {
            firebase.database().ref('images/').child(key).update({ url: filePath });
          }).then(() => {
            Overlay.toggleOverlayAndForm();
            Ui.populateImages();
          })
        // firebase.database().ref('images/').child(key).on('value', (data) => {
        //   console.log(data);
        // });
      });
  }
}
