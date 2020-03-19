import { CalculatorComponent } from './calculator.component';

export interface Command {
    pressButton(calculatorComponent: CalculatorComponent): void;
}


export class CommandInputNumber implements Command {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    pressButton(calc: CalculatorComponent): void {
        calc.appendInput('' + this.value);
    }
}

export class CommandInputDecimalPoint implements Command {
    pressButton(calc: CalculatorComponent): void {
        calc.appendInput('.');
    }
}

export class CommandInputPlusMinus implements Command {
    pressButton(calc: CalculatorComponent): void {
        if (calc.input.startsWith('-')) {
            calc.input = calc.input.substring(1);
        } else {
            calc.input = '-' + calc.input;
        }
    }
}

export class CommandInputOperator implements Command {
    label: string;

    pressButton(calc: CalculatorComponent): void {

        // Perform calculation
        calc.performCalculation();
        // Append input number and operator to calculation string.
        calc.appendCalculation(calc.input);
        calc.appendCalculation(this.label);
        // Set the current operator for the next calculation
        calc.setCurrentOperator(this.label);
        // Reset input
        calc.resetInput();
    }

    constructor(label: string) {
        this.label = label;
    }
}

export class CommandInputBackspace implements Command {
    pressButton(calc: CalculatorComponent): void {
        if (calc.input.length > 1) {
            calc.input = calc.input.substring(0, calc.input.length - 1);
        } else {
            calc.resetInput();
        }

    }
}

export class CommandInputClear implements Command {
    pressButton(calc: CalculatorComponent): void {
        calc.reset();
    }
}

export class CommandInputClearEntry implements Command {
    pressButton(calc: CalculatorComponent): void {
        calc.resetInput();
    }
}
