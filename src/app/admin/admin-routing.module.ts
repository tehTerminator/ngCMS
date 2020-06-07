import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { AdminComponent } from './admin.component';
import { MenuEditorComponent } from './menu-editor/menu-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'post', component: PostEditorComponent },
            { path: 'page', loadChildren: () => import('./page/page.module').then(m => m.PageModule) },
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