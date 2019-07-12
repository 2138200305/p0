export default class Reimbursement {
  roleId: number;
  role: string;
  reimbursementId: number;
  author: number;
  amount: number;
  dateSubmitted: number;
  dateResolved: number;
  description: string;
  resolver: number;
  status: number;
  type: number;


  constructor(obj) {
    if (!obj) {
      return;
    }

    this.roleId = obj.roleId;
    this.role = obj.role;
    this.reimbursementId = obj.reimbursementId;
    this.author = obj.author;
    this.amount = obj.amount;
    this.dateSubmitted = obj.dateSubmitted;
    this.dateResolved = obj.dateResolved;
    this.resolver = obj.resolver;
    this.status = obj.status;
    this.type = obj.type;


  }
}