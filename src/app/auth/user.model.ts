export class User {
    constructor(
        public id: number,
        public username: string,
        private theToken: string,
        private tokenExpirationTime: number) { }

    get token(): string {
        if ((new Date()).getTime() > this.tokenExpirationTime) {
            return null;
        }
        return this.theToken;
    }
}
export interface Profile {
    id: number;
    fullName: string;
    dateOfBirth: string;
    location: string;
    bio: string;
    imageUrl: string;
}
