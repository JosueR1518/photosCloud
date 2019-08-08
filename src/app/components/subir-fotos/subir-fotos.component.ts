import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargarImagenesService } from '../../services/cargar-imagenes.service';

@Component({
  selector: 'app-subir-fotos',
  templateUrl: './subir-fotos.component.html',
  styleUrls: ['./subir-fotos.component.css']
})
export class SubirFotosComponent implements OnInit {

  archivos: FileItem[] = [];

  estaSobreElemento = false;
  constructor(private cargarImgService: CargarImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {

    this.cargarImgService.cargarImagenes(this.archivos);
  }


  limpiar() {

    this.archivos = [];
  }


}
