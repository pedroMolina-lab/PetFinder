"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const router = new router_1.Router(document.querySelector('.root'));
router.setRoutes([
    { path: '/', component: 'welcome-page' },
    { path: '/ingreso', component: 'inicio-page' },
    { path: '/registro', component: 'registro-page' },
    { path: '/reporte', component: 'reporte-page' },
    { path: '/petReport', component: 'mascotas-reportadas' },
    { path: '/verMascota', component: 'ver-mascotas-reportadas' },
    { path: '/miUbicacion', component: 'ubicacion-page' },
]);
