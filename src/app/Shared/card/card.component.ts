// card.component.ts
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card class="title" [header]="title">
      <ng-content></ng-content>
    </p-card>
  `,
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title: string | undefined;
}
