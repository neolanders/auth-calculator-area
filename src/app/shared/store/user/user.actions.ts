import { User } from '../../models/user.model';
import { Log } from '../../models/logs.model';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
    AddUser = '[User] AddUser',
    UpdateUser = '[User] UpdateUser',
    RemoveUser = '[User] RemoveUser'
}

export class AddUser implements Action {
  readonly type = UserActionTypes.AddUser;

  constructor(public payload: { user: User }) {}
}

export class UpdateUser implements Action {
    readonly type = UserActionTypes.UpdateUser;

    constructor(public payload: { user: User }) {}
}

export class RemoveUser implements Action {
  readonly type = UserActionTypes.RemoveUser;

  constructor(public payload: any) {}
}

export type UserActions =
  | AddUser
  | UpdateUser
  | RemoveUser;
