import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Import BrowserAnimationsModule

import { AppComponent } from './app.component';
import { TransferApplicationComponent } from './transfer-application/transfer-application.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';  // Import the interceptor
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';

// Import ApplicationService
import { ApplicationService } from './application.service';

@NgModule({
  declarations: [
    AppComponent,
    TransferApplicationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    BrowserAnimationsModule  // Add BrowserAnimationsModule to the imports array
  ],
  providers: [
    ApplicationService,  // Add ApplicationService to the providers array
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
