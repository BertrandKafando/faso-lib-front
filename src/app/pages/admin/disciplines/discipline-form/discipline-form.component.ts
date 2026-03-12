import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Discipline } from '../discipline.model';

@Component({
  selector: 'app-discipline-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule
  ],
  templateUrl: './discipline-form.component.html',
  styleUrl: './discipline-form.component.css'
})
export class DisciplineFormComponent {
  @Input() visible: boolean = false;
  @Input() discipline: Discipline = { name: '', code: '', description: '' };
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Discipline>();
  @Output() onCancel = new EventEmitter<void>();

  submitted: boolean = false;

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onCancel.emit();
    this.submitted = false;
  }

  save() {
    this.submitted = true;

    if (this.discipline.name?.trim() && this.discipline.code?.trim()) {
      this.onSave.emit(this.discipline);
      this.submitted = false;
    }
  }
}
