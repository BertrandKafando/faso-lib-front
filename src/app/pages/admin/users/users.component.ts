import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User, UserRole, UserStatus } from '../../../models/user';
import { TranslateModule } from '@ngx-translate/core';
import {
  LucideAngularModule,
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Building,
  RefreshCw,
  AlertCircle
} from 'lucide-angular';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    LucideAngularModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    TableModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private messageService = inject(MessageService);

  users = signal<User[]>([]);
  isLoading = signal(true);
  searchQuery = signal('');
  errorMessage = signal('');

  // Computed filtered users
  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.users();
    return this.users().filter(u =>
      u.email.toLowerCase().includes(query) ||
      u.firstName.toLowerCase().includes(query) ||
      u.lastName.toLowerCase().includes(query) ||
      (u.institution && u.institution.toLowerCase().includes(query))
    );
  });

  // Stats
  activeCount = computed(() => this.users().filter(u => u.status === 'ACTIVE').length);
  pendingCount = computed(() => this.users().filter(u => u.status === 'PENDING').length);
  suspendedCount = computed(() => this.users().filter(u => u.status === 'SUSPENDED').length);

  // Dropdown options
  roles: { label: string; value: UserRole }[] = [
    { label: 'Lecteur', value: 'READER' },
    { label: 'Auteur', value: 'AUTHOR' },
    { label: 'Modérateur', value: 'MODERATOR' },
    { label: 'Admin', value: 'ADMIN' }
  ];

  statuses: { label: string; value: UserStatus }[] = [
    { label: 'Actif', value: 'ACTIVE' },
    { label: 'En attente', value: 'PENDING' },
    { label: 'Suspendu', value: 'SUSPENDED' },
    { label: 'Supprimé', value: 'DELETED' }
  ];

  // Icons
  readonly UsersIcon = Users;
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly MoreIcon = MoreVertical;
  readonly RefreshIcon = RefreshCw;
  readonly AlertIcon = AlertCircle;
  readonly MailIcon = Mail;
  readonly BuildingIcon = Building;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.userService.adminGetUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Impossible de charger les utilisateurs. Vérifiez votre connexion.');
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les utilisateurs.',
          life: 4000
        });
      }
    });
  }

  updateStatus(user: User, status: UserStatus) {
    this.userService.adminUpdateStatus(user.id, status).subscribe({
      next: (updatedUser) => {
        this.users.update(users => users.map(u => u.id === updatedUser.id ? updatedUser : u));
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Statut de ${user.firstName} mis à jour.`,
          life: 3000
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de mettre à jour le statut.',
          life: 4000
        });
      }
    });
  }

  updateRole(user: User, role: UserRole) {
    this.userService.adminUpdateRole(user.id, role).subscribe({
      next: (updatedUser) => {
        this.users.update(users => users.map(u => u.id === updatedUser.id ? updatedUser : u));
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Rôle de ${user.firstName} mis à jour.`,
          life: 3000
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de mettre à jour le rôle.',
          life: 4000
        });
      }
    });
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'PENDING': return 'warn';
      case 'SUSPENDED': return 'danger';
      case 'DELETED': return 'contrast';
      default: return 'info';
    }
  }

  getRoleSeverity(role: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (role) {
      case 'ADMIN': return 'danger';
      case 'MODERATOR': return 'warn';
      case 'AUTHOR': return 'info';
      default: return 'secondary';
    }
  }

  getRoleLabel(role: string): string {
    return this.roles.find(r => r.value === role)?.label ?? role;
  }

  getStatusLabel(status: string): string {
    return this.statuses.find(s => s.value === status)?.label ?? status;
  }
}
