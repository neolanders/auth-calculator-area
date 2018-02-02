
import { AddLogs, LogsActions, LogsActionTypes } from './logs.actions';
import { Log } from '../../models/logs.model';

export interface State {
  logs: Array<Log>;
}

export const initialState: State = {
  logs: []
};

export function reducer(state = initialState, action: LogsActions): State {
	// tslint:disable:indent
	switch (action.type) {
		case LogsActionTypes.AddLogs: {
			return {
				...state,
				logs: [...state.logs, ...[action.payload.log]]
			};
		}

		case LogsActionTypes.RemoveLogs: {
			return {
				...state,
				logs: undefined
			};
		}

		default: {
			return state;
		}
	}
}

export const getLogs = (state: State) => state.logs;
