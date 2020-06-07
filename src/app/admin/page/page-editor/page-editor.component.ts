import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SqlResponse, SqlService } from '../../../shared/sql.service';
import { AuthService } from './../../../auth/auth.service';
import { take } from 'rxjs/operators';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css']
})
export class PageEditorComponent implements OnInit {
  pageEditor: FormGroup;
  myEditor = ClassicEditor;

  constructor(
    private fb: FormBuilder,
    private sql: SqlService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.pageEditor = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      body: ['', Validators.required],
      slug: ['', Validators.required, this.slugValidator.bind(this)],
      author_id: [{ value: '', disabled: true }, Validators.required]
    });

    this.authService.user
      .pipe(take(1))
      .subscribe((user: User) => this.pageEditor.patchValue({ author_id: user.id }));
  }

  get body(): FormControl {
    return this.pageEditor.get('body') as FormControl;
  }

  get slug(): FormControl {
    return this.pageEditor.get('slug') as FormControl;
  }

  slugValidator() {
    const promise = new Promise<any>((resolve) => {
      this.sql.select('pages', { andWhere: { slug: this.slug.value } })
        .subscribe((res: SqlResponse) => {
          console.log(res);
          if (res.data.length > 0) {
            resolve({ slugExists: true });
          }
          resolve(null);
        });

    });
    return promise;
  }

  onSubmit() {
    // console.log(this.pageEditor);
    const userData = { ...this.pageEditor.value };
    delete (userData.id);
    this.sql.insert('pages', { userData }).subscribe((res) => console.log(res));
  }

}
