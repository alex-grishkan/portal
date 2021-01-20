export class Result {
  constructor(
    public patientName: string,
    public patientDOB: Date,
    public accession: string,
    public dateOfService: Date,
    public reportDate: Date,
    public testList: string,
    public viewURL: string
  ) {}
}
