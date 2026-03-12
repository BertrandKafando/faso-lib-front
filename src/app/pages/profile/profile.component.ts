import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../layout/layout.component';
import { UserService, ProfileUpdateRequest } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import {
  LucideAngularModule, User as UserIcon, Mail, Phone, Building,
  BookOpen, Award, FileText, Camera, Save, X, Edit2, ShieldCheck
} from 'lucide-angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent, LucideAngularModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  user = signal<User | null>(null);
  isEditing = signal(false);
  isLoading = signal(true);
  isSaving = signal(false);
  isUploadingPicture = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  // Edit form data
  editForm: ProfileUpdateRequest = {};

  // Icons
  readonly UserIconImg = UserIcon;
  readonly MailIcon = Mail;
  readonly PhoneIcon = Phone;
  readonly BuildingIcon = Building;
  readonly BookOpenIcon = BookOpen;
  readonly AwardIcon = Award;
  readonly FileTextIcon = FileText;
  readonly CameraIcon = Camera;
  readonly SaveIcon = Save;
  readonly XIcon = X;
  readonly EditIcon = Edit2;
  readonly ShieldCheckIcon = ShieldCheck;

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading.set(true);
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user.set(user);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger le profil.');
        this.isLoading.set(false);
      }
    });
  }

  startEdit() {
    const u = this.user();
    if (!u) return;
    this.editForm = {
      firstName: u.firstName,
      lastName: u.lastName,
      phone: u.phone ?? '',
      bio: u.bio ?? '',
      institution: u.institution ?? '',
      department: u.department ?? '',
      academicTitle: u.academicTitle ?? '',
      orcid: u.orcid ?? ''
    };
    this.isEditing.set(true);
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.errorMessage.set(null);
  }

  saveProfile() {
    this.isSaving.set(true);
    this.errorMessage.set(null);

    this.userService.updateProfile(this.editForm).subscribe({
      next: (updatedUser) => {
        this.user.set(updatedUser);
        this.authService.refreshProfile(updatedUser);
        this.isEditing.set(false);
        this.isSaving.set(false);
        this.successMessage.set('Profil mis à jour avec succès !');
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message || 'Erreur lors de la mise à jour.');
      }
    });
  }

  onPictureSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.isUploadingPicture.set(true);
    this.userService.uploadProfilePicture(file).subscribe({
      next: (res) => {
        const current = this.user();
        if (current) {
          const updated = { ...current, profilePicture: res.url };
          this.user.set(updated);
          this.authService.refreshProfile(updated);
        }
        this.isUploadingPicture.set(false);
        this.successMessage.set('Photo de profil mise à jour !');
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.isUploadingPicture.set(false);
        this.errorMessage.set(err.error?.message || 'Erreur lors de l\'upload.');
      }
    });
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      READER: 'Lecteur', AUTHOR: 'Auteur',
      ADMIN: 'Administrateur', MODERATOR: 'Modérateur'
    };
    return labels[role] || role;
  }

  getStatusClass(status: string): string {
    return status === 'ACTIVE' ? 'text-secondary' : 'text-destructive';
  }

  getInitials(user: User): string {
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  }
}
