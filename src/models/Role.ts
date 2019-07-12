export default class Role {
    roleId: number;
    role: string;




    constructor(obj) {
        if (!obj) {
            return;
        }

        this.roleId = obj.roleId;
        this.role = obj.role;

    }
}