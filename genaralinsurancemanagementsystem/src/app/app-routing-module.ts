import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Dashboard } from './component/dashboard/dashboard';
import { Registration } from './component/auth/registration/registration';
import { Login } from './component/auth/login/login';
import { Userprofile } from './component/auth/userprofile/userprofile';
import { Showallhealthpolicy } from './component/health/showallhealthpolicy/showallhealthpolicy';
import { Addhealthpolicy } from './component/health/addhealthpolicy/addhealthpolicy';
import { Healthbody } from './component/health/healthbody/healthbody';
import { Healthpolicyshow } from './component/health/healthpolicyshow/healthpolicyshow';
import { Policy } from './component/policy/policy';
import { Creatpolicy } from './component/creatpolicy/creatpolicy';
import { Updatepolicy } from './component/updatepolicy/updatepolicy';


const routes: Routes = [
  {path:'',component: Home},
  {path:'dashboard', component:Dashboard},
  {path:'reg', component: Registration},
  {path:'login', component: Login},
  {path:'userProfile', component: Userprofile},
  {path:'updatepolicy', component: Showallhealthpolicy},
  {path:'health/add', component: Addhealthpolicy},
  {path:'health', component: Addhealthpolicy},
  {path:'health/edit/:id', component: Addhealthpolicy},
  {path:'healthbody', component: Healthbody},
  {path:'showhealthpolicy', component:Healthpolicyshow},
  { path: "viewpolicy", component: Policy },
  { path: "createpolicy", component: Creatpolicy },
  { path: "updatepolicy/:id", component: Updatepolicy },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
