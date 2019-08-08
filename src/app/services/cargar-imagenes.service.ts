import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargarImagenesService {


  private  CARPETA_IMAGENES = 'img';

 constructor(private db: AngularFirestore) { }


 guardarImagen(imagen: { nombre: string, url: string }) {


   this.db.collection(`${this.CARPETA_IMAGENES}`).add(imagen);


 }


 cargarImagenes(imagenes: FileItem[]) {



  // Uso de Storage de Firebase
  const storageRef = firebase.storage().ref();

  for ( const item of imagenes) {
    item.estadoSubiendo = true;

    if (item.progreso > 100 ) {
       continue;
    }
    const uploadTask: firebase.storage.UploadTask =
    storageRef
    .child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
    .put(item.archivo);


    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      (err) => console.log('Error al abrir', err),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          item.url = downloadURL;

         // console.log(uploadTask.snapshot);
          item.estadoSubiendo = false;
          this.guardarImagen({nombre: item.nombreArchivo, url: item.url });
      });
    });
  }

 }
}
