// src/app/transfer-application/transfer-application.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-transfer-application',
  templateUrl: './transfer-application.component.html',
  styleUrls: ['./transfer-application.component.css']
})
export class TransferApplicationComponent implements OnInit {

  transferForm: FormGroup;
  loading = false;
  successMessage: string;
  errorMessage: string;
  checkMessage: string;
  transferMessage: string;

  applicationDetails: any = null;
  userDetails: any = null;

  constructor(private fb: FormBuilder, private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      applicationCode: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]]
    });
  }

  onCheck() {
    if (this.transferForm.invalid) {
      return;
    }

    this.loading = true;
    this.checkMessage = '';
    this.errorMessage = '';
    this.applicationDetails = null;
    this.userDetails = null;

    const applicationCode = this.transferForm.get('applicationCode').value;
    const emailAddress = this.transferForm.get('emailAddress').value;

    // Check application code
    this.applicationService.checkApplication(applicationCode).subscribe(
      appResponse => {
        this.applicationDetails = appResponse.details;

        // Check email address
        this.applicationService.checkUser(emailAddress).subscribe(
          userResponse => {
            this.userDetails = userResponse.details;
            this.loading = false;
            this.checkMessage = 'Both Application Code and Email Address exist.';
          },
          userError => {
            this.loading = false;
            this.errorMessage = 'Email Address does not exist.';
          }
        );
      },
      appError => {
        this.loading = false;
        this.errorMessage = 'Application Code does not exist.';
      }
    );
  }

  onSubmit() {
    if (this.transferForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.checkMessage = '';

    const applicationCode = this.transferForm.get('applicationCode').value;
    const emailAddress = this.transferForm.get('emailAddress').value;

    this.applicationService.transferApplication(applicationCode, emailAddress)
      .subscribe(
        response => {
          this.loading = false;
          this.successMessage = `Transfer Successful: ${response.message}`;
          this.transferMessage = response.copy_message; // Message to copy
        },
        error => {
          this.loading = false;
          this.errorMessage = error.error.message || 'An error occurred.';
        }
      );
  }

  copyToClipboard() {
    if (this.transferMessage) {
      navigator.clipboard.writeText(this.transferMessage).then(
        () => console.log('Copied to clipboard!'),
        err => console.error('Could not copy text:', err)
      );
    }
  }
}
