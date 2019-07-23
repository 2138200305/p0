export default class User {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: number;


    constructor(obj) {
        if (!obj) {
            return;
        }

        this.userId = obj.userId || obj.user_id ||obj.userid || null ;
        this.username = obj.username;
        this.password = obj.password ||obj.user_password||null;
        this.firstName = obj.firstname||obj.firstName;
        this.lastName = obj.lastname||obj.lastName;
        this.email= obj.email;
        this.role= obj.user_role ||obj.role;

    }
}