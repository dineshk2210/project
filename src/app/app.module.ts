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
import { PrecautionComponent } from './precaution/precaution.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddPrecautionComponent } from './add-precaution/add-precaution.component';
import * as CanvasJSAngularChart from '../assets/canvasjs-3.7.5/canvasjs.angular.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatbotComponent } from './chatbot/chatbot.component';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


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
    PrecautionComponent,
    AboutUsComponent,
    AddPrecautionComponent,
    CanvasJSChart,
    ChatbotComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
