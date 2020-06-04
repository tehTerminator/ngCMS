import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SqlRequest, SqlResponse } from '../../shared/sql.interface';
import { Captcha } from '../../shared/captcha.validator';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sign-in',
    templateUrl: './signIn.component.html',
    styleUrls: ['./signIn.component.css']
})
export class SignInComponent implements AfterViewInit, OnInit {
    @ViewChild('canvasContainer') canvasContiner: ElementRef;
    loginForm: FormGroup;
    passwordFieldType = 'password';
    isLoading = false;
    captchaQuestion = '';

    constructor(
        private fb: FormBuilder,
        private renderer: Renderer2,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.captchaQuestion = Captcha.generate();
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            captcha: ['', [Validators.required, Captcha.validator(this.captchaQuestion)]]
        });

        this.authService.autoSignIn();
    }

    ngAfterViewInit() {
        Captcha.draw(this.renderer, this.canvasContiner, this.captchaQuestion);
    }

    onSubmit() {
        this.isLoading = true;
        this.authService.signIn(this.username.value, this.password.value)
            .subscribe((res: SqlResponse) => {
                this.isLoading = false;
                if (res.status) {
                    this.router.navigate(['/admin']);
                } else {
                    alert('Invalid Username or Password');
                    this.loginForm.reset();
                }
            });
    }

    get username(): FormControl {
        return this.loginForm.get('username') as FormControl;
    }

    get password(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    get captcha(): FormControl {
        return this.loginForm.get('captcha') as FormControl;
    }
}
