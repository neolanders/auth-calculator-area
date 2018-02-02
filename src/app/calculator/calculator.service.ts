import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators/retry';
@Injectable()
export class CalculatorService {

    private allowOperations: any = { add : '+',
                                     sub : '-',
                                     div : '/',
                                     mlt : '*',
                                     mod : '%',
                                     exp : '^' };

    evaluate(equation): Promise<any> {
        // In general it's a bad practice to use eval:
        // https://stackoverflow.com/questions/6479236/calculate-string-value-in-javascript-not-using-eval
        // eval(equation)
        // In our case to evaluate the operation it may be an option.
        // For the current solution there is still some features missing that can be always implemented later:
        //  - it only handles the basic operators
        //  - it does not check the validity of the numbers (example: divide by zero)
        //  - it has not implemented parenthetical operation
        //  - for all these reasons and more, eval would be a better choice

        // tslint:disable-next-line:no-eval
        return Promise.resolve(this.calculate(equation));
    }

    // Helperfunction used by standardizeString()
    replaceBy(target, find, replace): string {
        return target.split(find)
                        .join(replace);
    }

    // Strip anything other than digits, (), -+/* and . for security reason
    standardizeString(input): string {
        while (input.charAt(0) === '+') {
            input = input.substr(1);
        }
        input = this.replaceBy(input, ' ', '');
        input = this.replaceBy(input, 'x', '*');
        input = this.replaceBy(input, '--', '+');
        input = this.replaceBy(input, '+-', '-');
        input = this.replaceBy(input, '-+', '-');
        input = this.replaceBy(input, '++', '+');

        return input;
    }

    // Create array for Order of Operation and precedence
    orderOperations(): any {
        const operations = this.allowOperations;

        return [[
            [operations.mlt],
            [operations.div],
            [operations.mod],
            [operations.exp],
            [operations.add],
            [operations.sub]
        ]];
    }

    calcInternal(a, op, b): any {
        const operations = this.allowOperations;
        const operation = Object.keys(operations)
            .find(key => operations[key] === op);
        a = a * 1; b = b * 1;
        switch (op) {
            case operations.add:
                return a + b;
            case operations.sub:
                return a - b;
            case operations.div:
                return a / b;
            case operations.mlt:
                return a * b;
            case operations.mod:
                return a % b;
            case operations.exp:
                return Math.pow(a, b);
            default:
                return undefined;
        }
    }

    // Loop while there is still calculation for level of precedence
    processOutput(result, input, output): any {
        while (result.test(input)) {
            output = this.calcInternal(RegExp.$1, RegExp.$2, RegExp.$3);
            if (isNaN(output) || !isFinite(output)) { return output; }   // exit early if not a number
            input = input.replace(result, output);
        }

        return output;
    }

    calculate(input): any {
        input = input.replace(/[^0-9%^*\/()\-+.]/g, ''); // clean up unnecessary characters

        const forder = this.orderOperations();
        let output;
        for (let i = 0, n = forder.length; i < n; i++) {

            // Regular Expression to look for operators between floating numbers or integers
            const result = new RegExp(`(\\d+\\.?\\d*)([\\'${forder[i]
                                            .join('\\')}'])(\\d+\\.?\\d*)`);
            result.lastIndex = 0; // be cautious and reset re start pos
            output = this.processOutput(result, input, output);
        }

        return output;
    }
}
