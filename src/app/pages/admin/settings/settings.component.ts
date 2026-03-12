import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingService } from '../../../services/setting.service';
import { Setting } from '../../../models/setting.model';
import { LucideAngularModule, Settings, Edit2, Save, X, Trash2, Plus, RefreshCw } from 'lucide-angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  private settingService = inject(SettingService);

  settings = signal<Setting[]>([]);
  isLoading = signal(true);
  editingId = signal<number | null>(null);
  editValue = '';
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  readonly SettingsIcon = Settings;
  readonly EditIcon = Edit2;
  readonly SaveIcon = Save;
  readonly XIcon = X;
  readonly TrashIcon = Trash2;
  readonly PlusIcon = Plus;
  readonly RefreshIcon = RefreshCw;

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.isLoading.set(true);
    this.settingService.getAllSettings().subscribe({
      next: (data) => {
        this.settings.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les paramètres.');
        this.isLoading.set(false);
      }
    });
  }

  startEdit(setting: Setting) {
    this.editingId.set(setting.id);
    this.editValue = setting.value;
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editValue = '';
  }

  saveEdit(setting: Setting) {
    this.settingService.createOrUpdate({ ...setting, value: this.editValue }).subscribe({
      next: (updated) => {
        this.settings.update(list =>
          list.map(s => s.id === updated.id ? updated : s)
        );
        this.editingId.set(null);
        this.successMessage.set(`Paramètre "${setting.key}" mis à jour.`);
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error?.message || 'Erreur lors de la mise à jour.');
      }
    });
  }

  getDataTypeClass(dataType: string): string {
    const classes: Record<string, string> = {
      integer: 'bg-primary/10 text-primary',
      boolean: 'bg-secondary/10 text-secondary',
      json: 'bg-highlight/20 text-foreground',
      string: 'bg-muted text-muted-foreground'
    };
    return classes[dataType] || 'bg-muted text-muted-foreground';
  }
}
