import * as AppActions from './app.actions'; 
import { User } from '../store/user.model';
import { Result } from './result.model';

export interface AppState {
	appProgress: boolean;
	user: User;
	results: Result[];
}

const initialState: AppState = {
	appProgress: false,
	user: null,
	results: [
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
		{ id: 'M1234567', patientName: 'John Doe', patientDOB: new Date('1961-03-21'), accession: 'M1234567', dateOfService: new Date('2020-11-01 10:00'), reportDate: new Date('2020-11-03'), testList: 'COVID-19' },
		{ id: 'M7654321', patientName: 'Jane Doe', patientDOB: new Date('1987-05-21'), accession: 'M7654321', dateOfService: new Date('2020-12-05 18:15'), reportDate: new Date('2020-12-08'), testList: 'CBC, CMP' },
		{ id: 'U5433234', patientName: 'Perry W. Mason', patientDOB: new Date('1942-03-11'), accession: 'U5433234', dateOfService: new Date('2020-09-12 09:10'), reportDate: new Date('2020-09-13'), testList: 'HPV' },
	]}

export function AppReducer(state: AppState = initialState, action: AppActions.AppActions) {
	switch (action.type) {
		case AppActions.LOGIN:
			return {
				...state,
				user: action.payload
			};
		case AppActions.LOGOUT:
			return {
				...state,
				appProgress: false,
				user: null,
				results: null
			};
		case AppActions.APP_PROGRESS:
			return {
				...state,
				appProgress: action.payload
			};
		default:
			return state
	}
}