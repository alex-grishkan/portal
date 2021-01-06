export class Result {

	constructor(
		public id: string,
		public patientName: string,
		public patientDOB: Date,
		public accession: string,
		public dateOfService: Date,
		public reportDate: Date,
		public testList: string
	) {}
}