import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Side2Component } from "./Shared/side2/side2.component";
import { HttpClientModule } from '@angular/common/http';
import { getCookie } from './Authentication/login/cookies';
import { CommonModule } from '@angular/common';
import { NotificationModalComponent } from "./Shared/notification-modal/notification-modal.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Side2Component, HttpClientModule, CommonModule, NotificationModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hack17';
  token: boolean = false;

  ngOnInit(): void {
    this.token = getCookie('access_token') !== null;
  }

  ngDoCheck(): void {
    this.token = getCookie('access_token') !== null;
  }
}
