import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { ViewAllStudent } from './view-all-student/view-all-student';
import { Addstudent } from './addstudent/addstudent';
import { Updatestudent } from './updatestudent/updatestudent';
import { ViewAllLocation } from './location/view-all-location/view-all-location';
import { Addlocation } from './location/addlocation/addlocation';
import { Updatelocation } from './location/updatelocation/updatelocation';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'allstu', component: ViewAllStudent },
  { path: 'addstu', component: Addstudent },
  { path: 'updatestudent/:id', component: Updatestudent },
  {path:'viewall', component:ViewAllLocation},
  {path:'updatelocation/:id', component:ViewAllLocation},
  {path:'addloc', component:Addlocation},
  {path:'allloc', component:Updatelocation},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
