import './styles/style.scss';

import *  as firebase from 'firebase';

//import js classes
import FirebaseHandler from './js/classes/FirebaseHandler';
import Ui from './js/classes/Ui';
import Overlay from './js/classes/Overlay';
import AddPhotoForm from './js/classes/AddPhotoForm';

// initialise js classes
FirebaseHandler.init();

Overlay.init();

const ui = new Ui();
ui.init();

const addPhotoForm = new AddPhotoForm();
addPhotoForm.init();