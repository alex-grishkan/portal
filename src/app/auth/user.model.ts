export class User {

	constructor(
		public id: string,
		public email: string,
		private _token: string,
		private _tokenExpDate: Date
	) {}

	get token() {
		if ( !this._token || this._tokenExpDate < new Date()) {
			return null;
		}
		return this._token; 
	}
}