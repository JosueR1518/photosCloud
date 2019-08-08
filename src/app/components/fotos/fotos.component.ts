import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargarImagenesService } from '../../services/cargar-imagenes.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  items: Observable <any>;
  estaSobreElemento = false;
  constructor(
    private cargarImgService: CargarImagenesService,
    private db: AngularFirestore) {
    this.items = db.collection('img').valueChanges();
    }
  ngOnInit() {
  }



}
