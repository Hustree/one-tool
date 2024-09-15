import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Import your login component
import { TransferApplicationComponent } from './transfer-application/transfer-application.component';
import { AuthGuard } from './auth.guard';  // Ensure you have the guard set up

// Define the application routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login by default
  { path: 'login', component: LoginComponent },  // Route for the login page
  { path: 'transfer', component: TransferApplicationComponent, canActivate: [AuthGuard] },  // Protected route for Transfer Application, guarded by AuthGuard
  { path: '**', redirectTo: '/login' }  // Redirect any unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],  // Use Hash routing strategy for better URL handling in some environments
  exports: [RouterModule]
})
export class AppRoutingModule { }
