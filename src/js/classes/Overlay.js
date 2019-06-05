export default class Overlay {

  static toggleOverlayAndForm() {
    const overlay = document.getElementById('overlay');
    const addNewImageForm = document.getElementById('add-new-photo-form');

    if (overlay.classList.contains('is--hidden')) {
      overlay.classList.remove('is--hidden');
      addNewImageForm.classList.remove('is--hidden');
      overlay.classList.add('is--visible');
      addNewImageForm.classList.add('is--visible');
    } else {
      overlay.classList.remove('is--visible');
      addNewImageForm.classList.remove('is--visible');
      overlay.classList.add('is--hidden');
      addNewImageForm.classList.add('is--hidden');
    }
  }

  static init() {
    document.getElementById('add-image').addEventListener('click', () => this.toggleOverlayAndForm());
    document.getElementById('overlay').addEventListener('click', () => this.toggleOverlayAndForm());
  }
}