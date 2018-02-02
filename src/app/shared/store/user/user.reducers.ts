
import { AddUser, UserActions, UserActionTypes } from './user.actions';
import { User } from '../../models/user.model';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: new User()
};

export function reducer(state = initialState, action: UserActions): State {
	// tslint:disable:indent
	switch (action.type) {
		case UserActionTypes.AddUser: {
			return {
				...state,
				user: action.payload.user
			};
		}

		case UserActionTypes.UpdateUser: {
			return {
				...state,
				user: action.payload.user
			};
		}

		case UserActionTypes.RemoveUser: {
			return {
				...state,
				user: undefined
			};
		}

		default: {
			return state;
		}
	}
}

export const getUser = (state: State) => state.user;
