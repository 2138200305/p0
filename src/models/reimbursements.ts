export default class Reimbursement {
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

    this.role = obj.role;
    this.reimbursementId = obj.reimbursementId || obj.reimbursementid;
    this.author = obj.author;
    this.amount = obj.amount;
    this.dateSubmitted = obj.dateSubmitted || obj.datesubmitted;
    this.dateResolved = obj.dateResolved || obj.dateresolved;
    this.resolver = obj.resolver  || obj.reimbursementtype;
    this.status = obj.status;
    this.type = obj.type;


  }
}