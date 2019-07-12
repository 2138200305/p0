export default class RemStatus {
    statusId: number;
    status: string;


    constructor(obj) {
        if (!obj) {
            return;
        }
        
        this.statusId = obj.statusId;
        this.status = obj.status;

    }
}