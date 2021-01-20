import * as ResultActions from './result-list.actions';
import { Result } from '../result.model';

export interface State {
  results: Result[];
  resultError: null;
  resultSpinner: boolean;
}

const initialState: State = {
  results: null,
  resultError: null,
  resultSpinner: false,
};

export function ResultReducer(
  state: State = initialState,
  action: ResultActions.ResultActions
) {
  switch (action.type) {
    case ResultActions.LOAD_START:
      return {
        ...state,
        results: null,
        resultError: null,
        resultSpinner: true,
      };
    case ResultActions.LOAD_SUCCESS:
      return {
        ...state,
        results: action.payload,
        resultError: null,
        resultSpinner: false,
      };
    case ResultActions.RESET:
      return {
        ...state,
        results: null,
      };
    default:
      return state;
  }
}
