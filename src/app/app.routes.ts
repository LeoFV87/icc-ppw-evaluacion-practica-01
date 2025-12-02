import { Routes } from '@angular/router';
import { FormularioPage } from './features/formulario/formularioPage/formularioPage';
import { HomePage } from './features/homePage/homePage';

export const routes: Routes = [


  {
    path: '',
    component: FormularioPage

  },

    {
    path: 'home',
    component: HomePage

  }
  




];
