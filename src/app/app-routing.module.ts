import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ContentComponent } from './content/content.component';
import { DiseasePredictorComponent } from './disease-predictor/disease-predictor.component';

const routes: Routes = [

  {
    path: '', component: ContentComponent,
  },
  {
    path: 'disease-predictor', component: DiseasePredictorComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
