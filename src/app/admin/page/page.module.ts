import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { PageComponent } from './page.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageRoutingModule } from './page.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminSharedModule } from '../shared/admin.shared.module';



@NgModule({
  declarations: [
    PageComponent,
    PageEditorComponent,
    PageListComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    CKEditorModule,
    ReactiveFormsModule,
    AdminSharedModule
  ]
})
export class PageModule { }
