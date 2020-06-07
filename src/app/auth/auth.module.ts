import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignUpComponent } from './signUp/signUp.component';
import { SignInComponent } from './signIn/signIn.component';

const routes: Routes = [
    {
        path: '', component: AuthComponent, children: [
            { path: 'signUp', component: SignUpComponent },
            { path: 'signIn', component: SignInComponent },
            { path: '', redirectTo: 'signIn', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    declarations: [
        AuthComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ]
})
export class AuthModule { }
