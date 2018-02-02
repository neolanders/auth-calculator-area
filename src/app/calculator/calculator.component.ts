import { Component, HostListener, OnInit } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { select, Store } from '@ngrx/store';
import * as LogsActions from '../shared/store/logs/logs.actions';
import * as fromLogs from '../shared/store/logs/index';
import { Log } from '../shared/models/logs.model';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HeaderService } from '../shared/services/header.service';

@Component({
    selector: 'myclc-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

    public history: String = '';
    public result: String = '';

    constructor(private calcService: CalculatorService,
                private store: Store<fromLogs.State>,
                private headerService: HeaderService) {}

    ngOnInit(): void {
        this.headerService.setTitle('My Calculator');
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event): void {
        const e = event as KeyboardEvent;

        // Ensure that keypress is Enter
        if ((e.keyCode === 13)) {
            e.preventDefault();
            this.onAnswer();
        }
    }

    onDigit(digit): void {
        this.history += digit;
    }

    onAction(action): void {
        this.history += action;
    }

    onAnswer(): void {
        if (this.history.match(/\d+$/)) { // match only valid numeric operation
            const equation = this.calcService.standardizeString(this.history);

            console.log('__equation', equation);
            this.calcService.evaluate(equation)
                .then(result => {
                    this.result = result;

                    // Save current opration into Logs Store
                    const log = new Log();
                    log.operation = this.history.toString();
                    log.createdAt = new Date();
                    log.id = new Date().getTime()
                                        .toString();

                    this.store.dispatch(new LogsActions.AddLogs({log}));
                })
                .catch(() => this.result = 'Error');
        }
    }

    onBack(): void {
        this.history = this.history.substring(0, this.history.length - 1);
    }

    onClear(): void {
        this.result = '';
        this.history = '';
    }
}
