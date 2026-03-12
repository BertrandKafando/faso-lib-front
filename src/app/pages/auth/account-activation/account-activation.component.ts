import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LucideAngularModule, GraduationCap, CheckCircle, XCircle, Loader, LogIn } from 'lucide-angular';

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './account-activation.component.html'
})
export class AccountActivationComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  status: 'loading' | 'success' | 'error' = 'loading';
  message = '';

  readonly GraduationCapIcon = GraduationCap;
  readonly CheckCircleIcon = CheckCircle;
  readonly XCircleIcon = XCircle;
  readonly LoaderIcon = Loader;
  readonly LogInIcon = LogIn;

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.status = 'error';
      this.message = 'Token d\'activation manquant.';
      return;
    }

    this.authService.activateAccount(token).subscribe({
      next: (res: any) => {
        this.status = 'success';
        this.message = res.message || 'Votre compte a été activé avec succès !';
      },
      error: (err) => {
        this.status = 'error';
        this.message = err.error?.message || 'Token invalide ou expiré. Veuillez vous réinscrire.';
      }
    });
  }
}
