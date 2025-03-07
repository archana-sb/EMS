import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { ToastService } from './shared/toast.service';
import { SuccessInterceptor } from './shared/interceptors/success.interceptor';
@NgModule({
  declarations: [AppComponent],

  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
  providers: [provideHttpClient(), ToastService, {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}, {provide: HTTP_INTERCEPTORS, useClass:SuccessInterceptor, multi:true}],
})
export class AppModule {}
