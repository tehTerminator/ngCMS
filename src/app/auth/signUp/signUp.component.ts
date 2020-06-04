import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { SqlRequest, SqlResponse } from '../../shared/sql.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User, Profile } from '../user.model';
import { Captcha } from './../../shared/captcha.validator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './signUp.component.html',
    styles: []
})
export class SignUpComponent implements OnInit, AfterViewInit {
    @ViewChild('imageField') imageField: ElementRef;
    @ViewChild('captcha') captchaContainer: ElementRef;
    signUpForm: FormGroup;
    imageData = '';
    private captchaQuestion: string;
    isLoading = false;

    constructor(
        private router: Router,
        private renderer: Renderer2,
        private http: HttpClient,
        private authService: AuthService,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.captchaQuestion = Captcha.generate();
        this.signUpForm = this.fb.group({
            username: ['',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(25),
                    Validators.pattern('^[a-zA-Z0-9]*$')
                ], this.userNameValidator.bind(this)],
            password: ['', [
                Validators.required,
                Validators.minLength(6)]],
            fullName: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(60)]],
            dateOfBirth: ['', Validators.required],
            location: '',
            bio: '',
            imageUrl: [{ value: '', disabled: true }],
            captchaAnswer: ['', [Validators.required, Captcha.validator(this.captchaQuestion)]]
        });
    }

    ngAfterViewInit() {
        Captcha.draw(this.renderer, this.captchaContainer, this.captchaQuestion);
    }

    userNameValidator(control: AbstractControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
            const request: SqlRequest = {
                queryType: 'userValidation',
                tableName: 'users',
                params: {
                    columns: ['username'],
                    andWhere: {
                        username: this.username.value
                    }
                }
            };
            this.http.post(environment.serverUrl, request)
                .subscribe((res: SqlResponse) => {
                    if (res.data.length > 0) {
                        resolve({ usernameExist: true });
                    }
                    resolve(null);
                });

        });
        return promise;
    }

    onImageSelected() {
        console.log(this.imageField.nativeElement);
        const file = this.imageField.nativeElement.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const b64 = reader.result;
            this.imageData = b64.toString();
        };
        reader.readAsDataURL(file);
    }

    onUpload() {
        this.http.post(environment.imageUpload, { imageData: this.imageData })
            .subscribe((res: any) => {
                if (res.imageUrl !== undefined) {
                    this.signUpForm.patchValue({
                        imageUrl: res.imageUrl
                    });
                }
            });
    }

    onSubmit() {
        this.isLoading = true;
        const profile: Profile = {
            id: 0,
            fullName: this.fullName.value,
            dateOfBirth: this.signUpForm.get('dateOfBirth').value,
            location: this.signUpForm.get('location').value,
            bio: this.signUpForm.get('bio').value,
            imageUrl: this.signUpForm.get('imageUrl').value
        };
        this.authService.signUp(this.username.value, this.password.value, profile)
            .subscribe((res: SqlResponse) => {
                this.isLoading = false;
                if (res.status) {
                    alert('User Inserted Successfully. Please Login');
                    this.router.navigate(['/auth', 'signIn']);
                }
            });
    }

    errorMessages(errors: { [key: string]: true }, fieldLabel: string) {
        const errorsList = {
            required: `Please Provide a ${fieldLabel}.`,
            minlength: `${fieldLabel} is very short.`,
            maxlength: `${fieldLabel} is too long.`,
            pattern: `Invalid Characters found in ${fieldLabel}`,
            usernameExist: `This Username is Not Available.`,
            captcha: 'Invalid Captcha Provided'
        };
        const error = Object.keys(errors)[0];
        return errorsList[error];
    }

    get username() {
        return this.signUpForm.get('username') as FormControl;
    }

    get imageUrl() {
        return this.signUpForm.get('imageUrl') as FormControl;
    }

    get password() {
        return this.signUpForm.get('password') as FormControl;
    }

    get fullName() {
        return this.signUpForm.get('fullName') as FormControl;
    }

    get captchaAnswer() {
        return this.signUpForm.get('captchaAnswer') as FormControl;
    }
}


