import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ClipboardPenLine, Plus, Pencil, Trash2 } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Discipline } from './discipline.model';
import { DisciplineFormComponent } from './discipline-form/discipline-form.component';

@Component({
  selector: 'app-disciplines',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    TranslateModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DisciplineFormComponent
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.css'
})
export class DisciplinesComponent {
  readonly ClipboardPenLine = ClipboardPenLine;
  readonly Plus = Plus;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;

  disciplines: Discipline[] = [
    { id: 1, name: 'Informatique', code: 'INF', description: 'Sciences de l\'information et du traitement de données.' },
    { id: 2, name: 'Droit', code: 'DRO', description: 'Étude des règles de conduite en société.' },
    { id: 3, name: 'Médecine', code: 'MED', description: 'Science et art de la santé.' },
  ];

  disciplineDialog: boolean = false;
  discipline: Discipline = { name: '', code: '', description: '' };

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  openNew() {
    this.discipline = { name: '', code: '', description: '' };
    this.disciplineDialog = true;
  }

  editDiscipline(discipline: Discipline) {
    this.discipline = { ...discipline };
    this.disciplineDialog = true;
  }

  deleteDiscipline(discipline: Discipline) {
    this.confirmationService.confirm({
      message: 'ADMIN.PAGEDISCIPLINES.DELETE_CONFIRM',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.disciplines = this.disciplines.filter((val) => val.id !== discipline.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'ADMIN.PAGEDISCIPLINES.SUCCESS_DELETE',
          life: 3000,
        });
      },
    });
  }

  saveDiscipline(discipline: Discipline) {
    if (discipline.id) {
      const index = this.findIndexById(discipline.id);
      this.disciplines[index] = discipline;
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'ADMIN.PAGEDISCIPLINES.SUCCESS_UPDATE',
        life: 3000,
      });
    } else {
      discipline.id = this.createId();
      this.disciplines.push(discipline);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'ADMIN.PAGEDISCIPLINES.SUCCESS_CREATE',
        life: 3000,
      });
    }

    this.disciplines = [...this.disciplines];
    this.disciplineDialog = false;
  }

  findIndexById(id: number): number {
    return this.disciplines.findIndex(d => d.id === id);
  }

  createId(): number {
    return Math.floor(Math.random() * 10000);
  }
}
