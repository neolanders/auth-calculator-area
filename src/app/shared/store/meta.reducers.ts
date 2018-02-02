import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AddLogs } from './logs/logs.actions';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromUser from './user/user.reducers';
import * as fromLogs from './logs/logs.reducers';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
    user: fromUser.State;
    logs: fromLogs.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<AppState> = {
    user: fromUser.reducer,
    logs: fromLogs.reducer
};

/**
 * Simple syncing between ngrx store and local storage to persist data
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync(
        {keys: ['user', 'logs'],
        rehydrate: true})(reducer);
}

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return (state: AppState, action: any): AppState => {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: Array<MetaReducer<any, any>> = !environment.production // Array<MetaReducer<AppState>>
    ? [localStorageSyncReducer, logger, storeFreeze]
    : [localStorageSyncReducer];
