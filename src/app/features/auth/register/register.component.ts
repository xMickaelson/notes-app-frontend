import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CardModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslatePipe,
    FloatLabel,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading: boolean = false;
  ngOnInit() {
    this.loading = false;
  }

  registrationForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ],
    ],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  register() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.authService
      .register(this.registrationForm.getRawValue() as any)
      .subscribe({
        next: (response) => {
          console.log('registerResponse:', response);
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Registration Error: ', error);
        },
      });
  }
}
