import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FotosComponent } from './components/fotos/fotos.component';
import { SubirFotosComponent } from './components/subir-fotos/subir-fotos.component';

const routes: Routes = [
  { path: 'fotos', component: FotosComponent },
  { path: 'subir', component: SubirFotosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'fotos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
