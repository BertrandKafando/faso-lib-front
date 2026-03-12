import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LucideAngularModule, LogIn, Lock, Mail, GraduationCap } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    ButtonModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error: string | null = null;
  isLoading = false;

  readonly LogInIcon = LogIn;
  readonly LockIcon = Lock;
  readonly MailIcon = Mail;
  readonly GraduationCapIcon = GraduationCap;

  onSubmit() {
    this.error = null;
    this.isLoading = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        const role = response.user.role;
        if (role === 'ADMIN' || role === 'MODERATOR') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.error = 'Email ou mot de passe incorrect.';
        } else if (err.status === 403) {
          this.error = 'Veuillez activer votre compte via le lien reçu par email.';
        } else if (err.status === 423) {
          this.error = 'Compte verrouillé suite à trop de tentatives. Réessayez dans 30 minutes.';
        } else {
          this.error = err.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
        }
      }
    });
  }
}
