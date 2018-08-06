import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

// import { AuthService } from './auth/auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { MyRsvpsComponent } from './pages/my-rsvps/my-rsvps.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    MyRsvpsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(),
    CoreModule.forRoot()
  ],
  providers: [
    AdminGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
