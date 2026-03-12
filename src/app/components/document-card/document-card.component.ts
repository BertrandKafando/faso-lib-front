import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, FileText, Eye, Lock } from 'lucide-angular';


import { Document } from '../../models/document';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-document-card',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, ButtonModule],
  templateUrl: './document-card.component.html'
})
export class DocumentCardComponent {
  @Input({ required: true }) document!: Document;

  readonly FileText = FileText;
  readonly Eye = Eye;
  readonly Lock = Lock;

  get isFree(): boolean {
    return Number(this.document.price) === 0;
  }
}
