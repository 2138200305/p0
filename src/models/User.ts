export default class User {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;


    constructor(obj) {
        if (!obj) {
            return;
        }

        this.userId = obj.userId;
        this.username = obj.username;
        this.password = obj.password;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email= obj.email;

    }
}