import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterRequest } from '../../../services/auth.service';
import {
  LucideAngularModule, GraduationCap, User, Mail, Lock, Phone,
  Building, BookOpen, Award, ChevronRight, CheckCircle
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    ButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Form fields
  email = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  lastName = '';
  phone = '';
  institution = '';
  department = '';
  academicTitle = '';

  // State
  isLoading = false;
  success = false;
  error: string | null = null;
  fieldErrors: Record<string, string> = {};

  // Icons
  readonly GraduationCapIcon = GraduationCap;
  readonly UserIcon = User;
  readonly MailIcon = Mail;
  readonly LockIcon = Lock;
  readonly PhoneIcon = Phone;
  readonly BuildingIcon = Building;
  readonly BookOpenIcon = BookOpen;
  readonly AwardIcon = Award;
  readonly ChevronRightIcon = ChevronRight;
  readonly CheckCircleIcon = CheckCircle;

  get passwordMismatch(): boolean {
    return this.confirmPassword.length > 0 && this.password !== this.confirmPassword;
  }

  onSubmit() {
    this.error = null;
    this.fieldErrors = {};

    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isLoading = true;

    const request: RegisterRequest = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone || undefined,
      institution: this.institution || undefined,
      department: this.department || undefined,
      academicTitle: this.academicTitle || undefined,
    };

    this.authService.register(request).subscribe({
      next: () => {
        this.isLoading = false;
        this.success = true;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        if (err.status === 400) {
          this.error = err.error?.message || 'Données invalides. Vérifiez le formulaire.';
        } else {
          this.error = 'Une erreur est survenue. Veuillez réessayer.';
        }
      }
    });
  }
}
