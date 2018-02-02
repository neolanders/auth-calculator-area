import { Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Log } from '../shared/models/logs.model';
import { Observable } from 'rxjs/Observable';
import { Dictionary } from '@ngrx/entity/src/models';
import * as fromLogs from '../shared/store/logs/logs.reducers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'myclc-operation-list',
    styleUrls: ['./operation-list.component.scss'],
    templateUrl: './operation-list.component.html'
})
export class OperationListComponent {

    public logs$: Observable<Array<Log>>;

    constructor(public store: Store<fromLogs.State>) {
        this.logs$ = store.select(fromLogs.getLogs);
    }
}
