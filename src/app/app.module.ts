import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';

import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './shared/auth.service';
import { environment } from 'src/environments/environment';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DiseasePredictorComponent } from './disease-predictor/disease-predictor.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    DiseasePredictorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
