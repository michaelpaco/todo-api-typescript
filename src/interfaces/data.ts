export enum Status {
  success = "success",
  fail = "fail"
}

export interface IData {
  status: Status;
  data?: any;
}
