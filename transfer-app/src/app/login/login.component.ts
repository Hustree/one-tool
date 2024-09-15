import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.http.post('https://api.buildpass.baguio.gov.ph/api/admin/login', { username, password })
      .subscribe(
        (response: any) => {
          this.loading = false;
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/transfer']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
  }
}
