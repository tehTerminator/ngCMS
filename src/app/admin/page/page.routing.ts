import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '', component: PageComponent, children: [
            { path: 'list', component: PageListComponent },
            { path: 'new', component: PageEditorComponent },
            { path: 'edit/:id', component: PageEditorComponent },
            { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
}) export class PageRoutingModule { }