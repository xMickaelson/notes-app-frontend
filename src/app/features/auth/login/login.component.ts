import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../../core/auth/services/auth.service';
import { TokenStorageService } from '../../../core/auth/services/token-storage.service';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private tokenStorage = inject(TokenStorageService);
  public translateService = inject(TranslateService);
  private router = inject(Router);

  loading = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.getRawValue() as any).subscribe({
      next: (response) => {
        this.loading = false;
        this.tokenStorage.saveAccessToken(response.accessToken);
        this.tokenStorage.saveRefreshToken(response.refreshToken);
        this.router.navigate(['app', 'dashboard']).then((result) => {
          console.log(result);
        });
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error: ', error);
      },
    });
  }
}
