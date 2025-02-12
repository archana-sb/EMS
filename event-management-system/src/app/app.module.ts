import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],

  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [provideHttpClient()],
})
export class AppModule {}
