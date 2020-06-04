import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { AdminComponent } from './admin.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { MenuEditorComponent } from './menu-editor/menu-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            { path: 'post', component: PostEditorComponent },
            { path: 'page', component: PageEditorComponent },
            { path: 'menu', component: MenuEditorComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }