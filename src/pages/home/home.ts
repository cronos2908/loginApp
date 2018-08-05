import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userLogin: string = '';
  passLogin: string = '';
  emailRecupera: string = '';
  login = [
    this.userLogin,
    this.passLogin
  ];

  alertMessages = [{
    "title": "Información faltante",
    "subtitle": "Por favor, revise la información suministrada"
  },{
    "title": "Error de inicio de sesión",
    "subtitle": `El servidor se encuentra ocupado.
    Por favor, intente más tarde`
  },{
    "title": 'Mensaje enviado',
    "subtitle": `Se ha enviado el mensaje al correo "${this.emailRecupera}"`
  }
  ];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  showPromptRecu() {
    const prompt = this.alertCtrl.create({
      title: 'Recuperar la contraseña',
      message: "Escribe la dirección de correo para enviar el mensaje de verificación",
      inputs: [
        {
          name: 'correoRecu',
          placeholder: 'Correo electrónico'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log('Saved clicked');
            this.emailRecupera = data.correoRecu; //JSON.stringify(data.correoRecu) Convierte a texto y lo pone entre "".
            this.alertMessages[2].subtitle = `Se ha enviado el mensaje al correo "${this.emailRecupera}"`;
            this.showAlert(2);
          }          
        }
      ]
    });
    prompt.present();
  }

  showAlert(mensaje: number) {
    const alert = this.alertCtrl.create({
      title: this.alertMessages[mensaje].title,
      subTitle: this.alertMessages[mensaje].subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  onSubmit(logForm: NgForm){
    if((logForm.value.emailLogin == undefined || logForm.value.emailLogin == "") && (logForm.value.passLogin == undefined || logForm.value.passLogin == "")){
      this.showAlert(0);
    }else if((logForm.value.emailLogin != undefined || logForm.value.emailLogin != "") || (logForm.value.passLogin != undefined || logForm.value.passLogin != "")){
      this.showAlert(1);
    }
    console.log(logForm.value);
    console.log(logForm.valid);
  }
}
