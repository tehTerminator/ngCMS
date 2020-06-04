import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, throwError, Subject } from 'rxjs';
import { User, Profile } from './user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SqlRequest, SqlResponse } from '../shared/sql.interface';
import { tap, exhaustMap, map, take, takeUntil } from 'rxjs/operators';
import { MINUTE, HOUR } from '../app.module';
import { Router } from '@angular/router';

interface UserData {
    id: number;
    username: string;
    token: string;
    generatedOn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
    user = new BehaviorSubject<User>(null);
    private destroy$ = new Subject();
    private timer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signIn(username: string, password: string) {
        const request: SqlRequest = {
            queryType: 'signIn',
            tableName: 'users',
            params: {
                andWhere: { username, password }
            }
        };
        return this.http.post<SqlResponse>(environment.serverUrl, request)
            .pipe(
                takeUntil(this.destroy$),
                tap((res: SqlResponse) => {
                    if (res.status) {
                        this.handleAuthentication(res.data[0]);
                    } else {
                        throwError(res.errors);
                    }
                }));
    }

    autoSignIn() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!!userData) {
            this.handleAuthentication(userData);
        }
    }

    handleAuthentication(userData: UserData) {

        if (this.timer != null) {
            clearTimeout(this.timer);
        }

        const expirationTime = (new Date(userData.generatedOn)).getTime() + HOUR;
        this.user.next(new User(
            userData.id,
            userData.username,
            userData.token,
            expirationTime
        ));

        localStorage.setItem('userData', JSON.stringify(userData));

        this.timer = setTimeout(() => {
            if (confirm('Your session is about to expire. Do you want to continue your work?')) {
                this.refreshToken()
                    .subscribe((res: SqlResponse) => {
                        this.handleAuthentication(res.data[0]);
                    });
            } else {
                this.signOut();
            }
        }, HOUR - (MINUTE * 2));
    }

    signUp(username: string, password: string, profile: Profile) {
        const request: SqlRequest = {
            queryType: 'signUp',
            tableName: 'users',
            params: {
                userData: { username, password }
            }
        };

        return this.http.post(environment.serverUrl, request)
            .pipe(
                takeUntil(this.destroy$),
                (exhaustMap((res) => this.createProfile(profile, res)))
            );

    }

    signOut() {
        this.user.next(null);
        clearTimeout(this.timer);
        localStorage.clear();
        this.router.navigate(['/home']);
    }

    private refreshToken() {
        return this.user
            .pipe(
                take(1),
                map((user: User) => {
                    if (!!user) {
                        return user.token;
                    }
                }),
                exhaustMap((token: string) => {
                    const request: SqlRequest = {
                        queryType: 'signIn',
                        tableName: 'users',
                        params: {
                            andWhere: { token }
                        }
                    };
                    return this.http
                        .post(environment.serverUrl, request)
                        .pipe(takeUntil(this.destroy$));
                }));
    }

    private createProfile(profile: Profile, response: any) {
        profile.id = response.lastInsertId;
        const request = {
            queryType: 'insert',
            tableName: 'profiles',
            params: {
                userData: profile
            }
        };
        return this.http
            .post(environment.serverUrl, request)
            .pipe(takeUntil(this.destroy$));
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

