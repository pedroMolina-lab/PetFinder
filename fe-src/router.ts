import {Router} from '@vaadin/router';

const router = new Router(document.querySelector('.root'));
router.setRoutes([
  { path: '/', component: 'welcome-page' },
  { path: '/ingreso', component: 'inicio-page' },
  { path: '/registro', component: 'registro-page' },
  { path: '/reporte', component: 'reporte-page' },
  { path: '/petReport', component: 'mascotas-reportadas' },
  { path: '/verMascota', component: 'ver-mascotas-reportadas' },
  { path: '/miUbicacion', component: 'ubicacion-page' },
  




  



]);
