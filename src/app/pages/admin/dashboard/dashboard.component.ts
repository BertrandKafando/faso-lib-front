import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { 
  LucideAngularModule, 
  Files, 
  Users, 
  Download, 
  Eye, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  LayoutDashboard
} from 'lucide-angular';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
  color: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly TrendingUpIcon = TrendingUp;
  readonly ArrowUpRightIcon = ArrowUpRight;
  readonly ArrowDownRightIcon = ArrowDownRight;
  readonly DashboardIcon = LayoutDashboard;
  readonly FilesIcon = Files;

  stats: StatCard[] = [
    {
      title: 'Total Documents',
      value: '1,284',
      change: '+12.5%',
      isPositive: true,
      icon: Files,
      color: 'bg-primary text-primary-foreground'
    },
    {
      title: 'Utilisateurs Actifs',
      value: '842',
      change: '+3.2%',
      isPositive: true,
      icon: Users,
      color: 'bg-accent text-accent-foreground'
    },
    {
      title: 'Téléchargements',
      value: '5,391',
      change: '+18.7%',
      isPositive: true,
      icon: Download,
      color: 'bg-secondary text-secondary-foreground'
    },
    {
      title: 'Vues Totales',
      value: '24.5k',
      change: '-2.4%',
      isPositive: false,
      icon: Eye,
      color: 'bg-highlight text-highlight-foreground'
    }
  ];

  recentActivities = [
    { id: 1, user: 'Idriss Dao', action: 'a téléchargé', target: 'Manuel de Droit.pdf', time: 'Il y a 2 min' },
    { id: 2, user: 'Sali Traoré', action: 'a créé un compte', target: '', time: 'Il y a 15 min' },
    { id: 3, user: 'Jean Soulama', action: 'a ajouté', target: 'Constitution du BF.epub', time: 'Il y a 45 min' },
    { id: 4, user: 'Admin', action: 'a mis à jour', target: 'Paramètres système', time: 'Il y a 2h' },
  ];

  topDocuments = [
    { name: 'Guide de l\'étudiant', category: 'Education', downloads: 450, growth: 12 },
    { name: 'Code Civil', category: 'Droit', downloads: 380, growth: 5 },
    { name: 'Recueil des lois', category: 'Légal', downloads: 290, growth: -2 },
  ];
}
