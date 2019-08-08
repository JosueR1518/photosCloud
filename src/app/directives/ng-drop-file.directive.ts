import { Directive, Output, HostListener, Input, ElementRef, EventEmitter } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFile]'
})
export class NgDropFileDirective {

  @Output () mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Input() archivos: FileItem[] = [];
  constructor() { }

  @HostListener ('dragover', ['$event']) public onDragEnter(event: any) {
    this._prevenirDragBrowser(event);
    this.mouseSobre.emit(true);
  }

  @HostListener ('dragleave', ['$event']) public onDragLeave(event: any) {
    this._prevenirDragBrowser(event);
    this.mouseSobre.emit(false);

  }

  @HostListener ('drop', ['$event']) public onDrop(event: any) {
    this._prevenirDragBrowser(event);
    this.mouseSobre.emit(false);


    const transferencia = this.__getTransferencia(event);
    if ( !transferencia) {
      return;
    }

    this._extraerArchivos( transferencia.files );

  }

  // para hacer más compatible con los distintos navegadores
  private __getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer ;
  }

  private _extraerArchivos( archivosLista: FileList ) {


// tslint:disable-next-line: forin
    for ( const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];
      if ( this.archivoCanload(archivoTemporal)) {
         const nuevoArchivo = new FileItem(archivoTemporal);

         this.archivos.push(nuevoArchivo);
      }
    }



  }


  //validaciones


/**
 * Prevenir que se abra la imagen al soltarla sobre el recuadro para cargar imagenes
 * @param event
 */
  private _prevenirDragBrowser(event: any) {

    event.preventDefault();
    event.stopPropagation();



  }

  private _archivoCargado(nombreArchivo: string): boolean {

    for (const archivo of this.archivos){
        if ( archivo.nombreArchivo === nombreArchivo) {
            console.log('Arcivo ya fue cargado:' + nombreArchivo);
            return true;
        }
    }


    return false;
  }



  private _esImagen( tipoArchivo: string): boolean {


    return (tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');


  }

  private archivoCanload( archivo: File) {


    if (!this._archivoCargado(archivo.name) && this._esImagen(archivo.type) ) {
        return true;
    } else {
      return false;
    }
  }

}
