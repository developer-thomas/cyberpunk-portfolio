import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-stat-card',
  imports: [CommonModule, NgIconsModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  @Input() title = ""
  @Input() value = ""
  @Input() trend = ""
  @Input() trendUp = true
}
