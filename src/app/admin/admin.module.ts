import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageEditorComponent } from './page-editor/page-editor.component';
import { MenuEditorComponent } from './menu-editor/menu-editor.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [
        PageEditorComponent,
        MenuEditorComponent,
        PostEditorComponent,
        AdminComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }