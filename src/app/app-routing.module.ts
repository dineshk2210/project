import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ContentComponent } from './content/content.component';
import { DiseasePredictorComponent } from './disease-predictor/disease-predictor.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthGuard } from './auth.guard';
import { PrecautionComponent } from './precaution/precaution.component';
import { AddPrecautionComponent } from './add-precaution/add-precaution.component';

const routes: Routes = [

  {
    path: 'about', component: AboutUsComponent
  },
  {
    path: '', component: ContentComponent,
  },
  {
    path: 'disease-predictor',
    component: DiseasePredictorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent,

  },
  {
    path: 'precaution', component: PrecautionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addPrecaution', component: AddPrecautionComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
