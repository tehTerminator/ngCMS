import { Component } from '@angular/core';
import { SqlService, SqlResponse } from './services/sql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';

  constructor(private sql: SqlService) { }

  onClick() {
    this.sql.select('users').subscribe((res) => console.log(res));
  }

  handleRespose(res: any) {
    console.log(res);
  }
}
