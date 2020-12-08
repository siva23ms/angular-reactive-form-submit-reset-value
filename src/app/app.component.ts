import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  title = 'angular-reactive-form-submit-reset-value';
  contactusForm: FormGroup;
  submitted = false;
  successmsg = false;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.contactusForm = this.fb.group({
      name : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactusForm.controls;
  }

  sendMessage(): void {
    this.submitted = true;

    if (this.contactusForm.invalid) {
      return;
    }
    const formData = this.contactusForm.value;
    if (formData) {
      setTimeout(() => {
        this.submitted = false;
        this.formGroupDirective.resetForm();
        this.successmsg = true;
      }, 1000);
    }
  }
}
