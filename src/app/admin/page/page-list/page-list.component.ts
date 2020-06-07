import { Component, OnInit } from '@angular/core';
import { Page } from '../../../shared/collections';
import { HttpClient } from '@angular/common/http';
import { SqlRequest, SqlResponse } from '../../../shared/sql.interface';
import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  pages: Page[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const request: SqlRequest = {
      queryType: 'select',
      tableName: 'pages',
      params: {
        columns: ['id', 'title', 'slug']
      }
    };
    this.http
      .post(environment.serverUrl, request)
      .subscribe({
        next: (res: SqlResponse) => {
          if (res.status) {
            this.pages = res.data;
          } else {
            throwError(res.errors);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}
