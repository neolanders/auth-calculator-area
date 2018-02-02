import { Log } from '../../models/logs.model';
import { Action } from '@ngrx/store';

export enum LogsActionTypes {
    AddLogs = '[Logs] AddLogs',
    RemoveLogs = '[Logs] RemoveLogs'
}

export class AddLogs implements Action {
  readonly type = LogsActionTypes.AddLogs;

  constructor(public payload: {log: Log}) {}
}

export class RemoveLogs implements Action {
  readonly type = LogsActionTypes.RemoveLogs;

  constructor(public payload: any) {}
}

export type LogsActions =
  | AddLogs
  | RemoveLogs;
