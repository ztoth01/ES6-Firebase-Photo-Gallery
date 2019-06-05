import FirebaseHandler from './FirebaseHandler';
import Overlay from './Overlay';

export default class Ui {

  constructor() {
    this.nextArrow = document.getElementById('next-arrow');
    this.previousArrow = document.getElementById('previous-arrow');
    this.main = document.querySelectorAll('.container')[0];
    this.currentSlide = 0;
    this.touchstartX = 0;
    this.touchendX = 0;
    this.minSwipDistance = 20;
  }

  // CALLBACK
  // static getImages() {
  //   FirebaseHandler.getFirebaseData(this.getImagesUrl);
  // }
  // static getImagesUrl(elem) {
  //   let z = Object.values(elem).forEach(elem => elem.url);
  //   console.log(z);
  // }
  // PROMISE
  // static getImages() {
  //   FirebaseHandler.getFirebaseData()
  //     .then((res) => {
  //       Object.values(res).forEach(elem => console.log(elem.url));
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  // Async await
  static populateImages() {
    let mainImages = '',
      thumbnails = '';
    FirebaseHandler.getFirebaseData()
      .then((res) => {
        Object.values(res).forEach((elem, index) => {
          mainImages += `<li class="slide ${index > 0 ? '' : 'showing'}">
              <img class="" src='${elem.url}' alt='${elem.title}' />
              <span class="slide__description">${elem.title}</span>
            </li>`;
          thumbnails += `<li class="thumbnail">
              <img class="" src="${elem.url}" alt="${elem.title}" />
            </li>`;
        });
        document.getElementById('slides').innerHTML = mainImages;
        document.getElementById('thumbnails-wrapper').innerHTML = thumbnails;
        Ui.slides = document.querySelectorAll('.slide');
      })
  }

  static toggleItemVisibility(item) {
    if (item.classList.contains('is--hidden')) {
      addNewImageForm.classList.remove('is--hidden');
      addNewImageForm.classList.add('is--visible');
    } else {
      addNewImageForm.classList.remove('is--visible');
      addNewImageForm.classList.add('is--hidden');
    }
  }

  goToSlide(n) {
    Array.from(Ui.slides).forEach(elem => elem.classList.remove('showing'));
    this.currentSlide = (n + Ui.slides.length) % Ui.slides.length;
    Ui.slides[this.currentSlide].classList.add('showing');
  }

  nextSlide() {
    this.currentSlide++;
    this.goToSlide(this.currentSlide);
  }

  previousSlide() {
    this.currentSlide--;
    this.goToSlide(this.currentSlide);
  }

  handleSwipe() {
    if (this.touchendX < this.touchstartX) {
      this.previousSlide();
    }
    if (this.touchendX > this.touchstartX) {
      this.nextSlide();
    }
  }

  //Calculate swipe distance
  calculateSwipeDistance() {
    return Math.abs(this.touchstartX - this.touchendX);
  }

  // Select currently displayed image in the carousel by clicking on one of the thumbnail items
  selectImageByThumbnail(e) {
    if (e.target.parentNode.classList.contains('thumbnail')) {
      const thumbnailIndex = [...e.target.parentNode.parentNode.children].indexOf(e.target.parentNode);;
      this.goToSlide(thumbnailIndex);
    }
  }

  // Navigate slides by arrow keys
  arrowKeys(e) {
    if (e.keyCode === 39) {
      this.nextSlide();
    } else if (e.keyCode === 37) {
      this.previousSlide();
    }
  };

  // Add event listeners
  init() {
    this.main.addEventListener('touchstart', e => {
      this.touchstartX = e.changedTouches[0].screenX;
    }, false);
    this.main.addEventListener('touchend', e => {
      this.touchendX = e.changedTouches[0].screenX;
      if (this.calculateSwipeDistance() >= this.minSwipDistance) {
        this.handleSwipe();
      }
    }, false);
    document.addEventListener('keydown', (e) => {
      this.arrowKeys(e);
    });
    this.nextArrow.addEventListener('click', () => this.nextSlide());
    this.previousArrow.addEventListener('click', () => this.previousSlide());
    document.addEventListener('click', (e) => this.selectImageByThumbnail(e));
    Ui.populateImages();
  }
}

