export class Login {
    email: string;
    password: string;
    authdata?: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
