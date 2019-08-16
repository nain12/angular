import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menubar: Event;
  displayNavigationMenu(event: Event): void {
    console.log(event);
    this.menubar = event;
  }
}
