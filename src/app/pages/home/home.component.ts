import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ChevronRight, BookOpen, Upload, Users } from 'lucide-angular';
import { LayoutComponent } from '../../layout/layout.component';
import { DocumentCardComponent } from '../../components/document-card/document-card.component';
import { DocumentsService } from '../../services/documents.service';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    LucideAngularModule,
    LayoutComponent,
    DocumentCardComponent,
    TranslatePipe,
    TranslateDirective,
    ButtonModule
  ],
  templateUrl: './home.component.html',
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
  `]
})
export class HomeComponent {
  private documentsService = inject(DocumentsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    // Redirection removed to allow landing on home page
  }

  searchQuery = '';
  
  // Fetch documents
  documentsSignal = toSignal(this.documentsService.getDocuments());
  
  // Icons
  readonly Search = Search;
  readonly ChevronRight = ChevronRight;
  readonly BookOpen = BookOpen;
  readonly Upload = Upload;
  readonly Users = Users;

  get recentDocs() {
     return this.documentsSignal()?.slice(0, 4) || [];
  }

  get isLoading() {
    return this.documentsSignal() === undefined; // primitive loading check
  }

  onSearch() {
    this.router.navigate(['/documents'], { queryParams: { search: this.searchQuery } });
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.onSearch();
    }
  }
}
