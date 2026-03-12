import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule, FileType, Plus, Pencil, Trash2, RefreshCw, AlertCircle } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DocumentType } from '../../../models/document-type.model';
import { DocumentTypeService } from '../../../services/document-type.service';

@Component({
  selector: 'app-document-types',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    LucideAngularModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    TagModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './document-types.component.html',
  styleUrl: './document-types.component.css'
})
export class DocumentTypesComponent implements OnInit {
  private service = inject(DocumentTypeService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private translate = inject(TranslateService);

  // Icons
  readonly FileTypeIcon = FileType;
  readonly PlusIcon = Plus;
  readonly PencilIcon = Pencil;
  readonly Trash2Icon = Trash2;
  readonly RefreshIcon = RefreshCw;
  readonly AlertIcon = AlertCircle;

  // State
  items = signal<DocumentType[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  // Dialog
  dialogVisible = false;
  editItem: Partial<DocumentType> = {};
  submitted = false;

  // Stats
  activeCount = computed(() => this.items().filter(i => i.isActive).length);
  inactiveCount = computed(() => this.items().filter(i => !i.isActive).length);

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.service.getAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set(this.translate.instant('ADMIN.PAGEDOCTYPES.ERROR_LOAD'));
        this.messageService.add({ severity: 'error', summary: this.translate.instant('COMMON.ERROR'), detail: this.translate.instant('ADMIN.PAGEDOCTYPES.ERROR_LOAD'), life: 4000 });
      }
    });
  }

  openNew() {
    this.editItem = { name: '', code: '', description: '', isActive: true };
    this.submitted = false;
    this.dialogVisible = true;
  }

  editType(item: DocumentType) {
    this.editItem = { ...item };
    this.submitted = false;
    this.dialogVisible = true;
  }

  deleteType(item: DocumentType) {
    this.confirmationService.confirm({
      message: this.translate.instant('ADMIN.PAGEDOCTYPES.DELETE_CONFIRM', { name: item.name }),
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(item.id).subscribe({
          next: () => {
            this.items.update(list => list.filter(i => i.id !== item.id));
            this.messageService.add({ severity: 'success', summary: this.translate.instant('COMMON.SUCCESS'), detail: this.translate.instant('ADMIN.PAGEDOCTYPES.SUCCESS_DELETE'), life: 3000 });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: this.translate.instant('COMMON.ERROR'), detail: this.translate.instant('ADMIN.PAGEDOCTYPES.ERROR_DELETE'), life: 4000 });
          }
        });
      }
    });
  }

  saveItem() {
    this.submitted = true;
    if (!this.editItem.name?.trim() || !this.editItem.code?.trim()) return;

    if (this.editItem.id) {
      this.service.update(this.editItem.id, this.editItem).subscribe({
        next: (updated) => {
          this.items.update(list => list.map(i => i.id === updated.id ? updated : i));
          this.messageService.add({ severity: 'success', summary: this.translate.instant('COMMON.SUCCESS'), detail: this.translate.instant('ADMIN.PAGEDOCTYPES.SUCCESS_UPDATE'), life: 3000 });
          this.dialogVisible = false;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: this.translate.instant('COMMON.ERROR'), detail: this.translate.instant('ADMIN.PAGEDOCTYPES.ERROR_SAVE'), life: 4000 });
        }
      });
    } else {
      this.service.create(this.editItem).subscribe({
        next: (created) => {
          this.items.update(list => [...list, created]);
          this.messageService.add({ severity: 'success', summary: this.translate.instant('COMMON.SUCCESS'), detail: this.translate.instant('ADMIN.PAGEDOCTYPES.SUCCESS_CREATE'), life: 3000 });
          this.dialogVisible = false;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: this.translate.instant('COMMON.ERROR'), detail: this.translate.instant('ADMIN.PAGEDOCTYPES.ERROR_SAVE'), life: 4000 });
        }
      });
    }
  }

  hideDialog() {
    this.dialogVisible = false;
    this.submitted = false;
  }
}
