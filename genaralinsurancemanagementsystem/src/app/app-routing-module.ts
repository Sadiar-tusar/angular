import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Dashboard } from './component/dashboard/dashboard';
import { Registration } from './component/auth/registration/registration';

const routes: Routes = [
  {path:'',component: Home},
  {path:'dashboard', component:Dashboard},
  {path:'reg', component: Registration}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
