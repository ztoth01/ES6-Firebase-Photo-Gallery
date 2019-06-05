import FirebaseHandler from './FirebaseHandler';

export default class Ui {

  constructor() {
    this.addNewImageForm = document.getElementById('add-new-photo-form');
    this.uploadPhotoInput = document.getElementById('upload-photo-input');
    this.uploadPhoto = document.getElementById('upload-photo');
    this.selectPhoto = document.getElementById('select-photo');
    this.newImage = document.getElementById('new-image');
    this.errorMessageWrapper = document.getElementById('error-message-wrapper');
    this.photoTitleInput = document.getElementById('title');
    this.newImageToUpload = {};
    this.image = null;
    this.errorMessage = {};
  }

  // Validation //
  validatePhotoTitle() {
    if (!this.newImageToUpload.title || this.newImageToUpload.title === '') {
      this.errorMessage['photoTitle'] = 'Please add a photo title';
    } else {
      delete this.errorMessage['photoTitle'];
    }
  }

  validatePhoto() {
    if (!this.image) {
      this.errorMessage['photo'] = 'Please select a photo';
    } else {
      delete this.errorMessage['photo'];
    }
  }

  validateFormFields() {
    this.setPhotoTitle();
    this.validatePhotoTitle();
    this.validatePhoto();
    if (Object.keys(this.errorMessage).length > 0) {
      this.populateErrorMessage();
      return false;
    }
    this.removeErrorMessage();
  }

  // Error message //
  populateErrorMessage() {
    let errorMessage = '';
    Object.values(this.errorMessage).forEach(elem => {
      errorMessage += `<li class="text-danger">${elem}</li>`;
    });
    this.errorMessageWrapper.innerHTML = errorMessage;
  }

  removeErrorMessage() {
    if (this.errorMessageWrapper.firstElementChild) {
      this.errorMessageWrapper.firstElementChild.remove;
    }
  }

  // toggleErrorMessage() {
  //   if (this.errorMessageWrapper.classList.contains('is-hidden')) {
  //     this.errorMessageWrapper.remove('is-hidden');
  //     this.errorMessageWrapper.add('is-visible');
  //   } else {
  //     this.errorMessageWrapper.remove('is-visible');
  //     this.errorMessageWrapper.add('is-hidden');
  //   }
  // }

  setPhotoTitle() {
    this.newImageToUpload.title = this.photoTitleInput.value;
  }

  getPhotoTitle() {
    return this.photoTitle;
  }

  triggerPhotoSelect(e) {
    e.preventDefault();
    this.uploadPhotoInput.click();
  }

  selectImageToUpLoad(e) {
    e.preventDefault();
    const files = e.target.files;
    const fileName = files[0].name;
    let imageUrl;
    if (fileName.lastIndexOf('.') <= 0) {
      return alert('Please make sure you use a valid file type');
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    this.image = files[0];
    fileReader.addEventListener('load', () => {
      imageUrl = fileReader.result;
      this.newImageToUpload = {
        image: this.image
      }
      this.showNewImageInFrom(imageUrl);
    })
  }

  showNewImageInFrom(src) {
    this.newImage.src = src;
    this.newImage.classList.remove('is--hidden');
    this.newImage.classList.add('is--visible');
  }

  init() {
    this.selectPhoto.addEventListener('click', (e) => this.triggerPhotoSelect(e));
    this.uploadPhotoInput.addEventListener('change', (e) => this.selectImageToUpLoad(e));
    this.uploadPhoto.addEventListener('click', (e) => {
      e.preventDefault();
      this.validateFormFields();
      console.log(this.newImageToUpload);
      FirebaseHandler.uploadNewImageToFirebase(this.newImageToUpload, e);
    });
  }
}