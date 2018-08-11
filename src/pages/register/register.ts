import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  register = {
    nombresRegister: '',
    apellidosRegister: '',
    emailRegister: '',
    emailConfRegister: '',
    passRegister: '',
    passConfRegister: ''
  }

  alertMessages = [{
    "title": "Información faltante",
    "subtitle": "Por favor, revise la información suministrada"
  }, {
    "title": "Error de confirmación de correo",
    "subtitle": `El correo y su confirmación suministradas no coinciden.
    Por favor, revise la información`
  }, {
    "title": "Error de confirmación de contraseña",
    "subtitle": `La contraseña y su confirmación suministradas no coinciden.
    Por favor, revise la información`
  }, {
    "title": 'Registro exitoso',
    "subtitle": `Bienvenido: ${this.register.nombresRegister} ${this.register.apellidosRegister}`
  }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  showAlert(mensaje: number) {
    const alert = this.alertCtrl.create({
      title: this.alertMessages[mensaje].title,
      subTitle: this.alertMessages[mensaje].subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  onSubmit(logForm: NgForm) {
    if (!logForm.valid) {
      this.showAlert(0);
    } else {
      if (logForm.value.emailRegister != logForm.value.emailConfRegister) {
        this.showAlert(1);
      } else if (logForm.value.passRegister != logForm.value.passConfRegister) {
        this.showAlert(2);
      } else {
        this.alertMessages[3].subtitle = `Bienvenido: ${this.register.nombresRegister} ${this.register.apellidosRegister}`;
        this.showAlert(3);
      }
    }
    console.log(logForm.value);
    console.log(logForm.valid);
  }
}
