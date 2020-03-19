import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  tiles: Tile[] = [
    { label: CalculatorConstants.BUTTON_CLEAR_ENTRY_LABEL, cols: 1, rows: 1, color: 'warn' },
    { label: CalculatorConstants.BUTTON_CLEAR_LABEL, cols: 1, rows: 1, color: 'warn' },
    { label: CalculatorConstants.BUTTON_BACKSPACE_LABEL, cols: 1, rows: 1, color: 'warn' },
    { label: CalculatorConstants.BUTTON_DIVIDE_LABEL, cols: 1, rows: 1, color: 'accent' },
    { label: CalculatorConstants.BUTTON_SEVEN_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_EIGHT_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_NINE_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_MULTIPLY_LABEL, cols: 1, rows: 1, color: 'accent' },
    { label: CalculatorConstants.BUTTON_FOUR_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_FIVE_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_SIX_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_SUBTRACT_LABEL, cols: 1, rows: 1, color: 'accent' },
    { label: CalculatorConstants.BUTTON_ONE_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_TWO_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_THREE_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_ADD_LABEL, cols: 1, rows: 1, color: 'accent' },
    { label: CalculatorConstants.BUTTON_PLUS_MINUS_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_ZERO_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_DECIMAL_POINT_LABEL, cols: 1, rows: 1, color: '' },
    { label: CalculatorConstants.BUTTON_EQUALS_LABEL, cols: 1, rows: 1, color: 'primary' },
  ];

  buttonCommands: { [id: string]: Command; } = {};

  calculation: string;
  input: string;
  currentTotal: number;

  inputDisplay: 'input' | 'currentTotal' = 'input';

  constructor() { }

  ngOnInit(): void {
    // reset the state
    this.reset();

    // Add all the button commands
    // Numbers
    this.buttonCommands[CalculatorConstants.BUTTON_ONE_LABEL] = new CommandInputNumber(1);
    this.buttonCommands[CalculatorConstants.BUTTON_TWO_LABEL] = new CommandInputNumber(2);
    this.buttonCommands[CalculatorConstants.BUTTON_THREE_LABEL] = new CommandInputNumber(3);
    this.buttonCommands[CalculatorConstants.BUTTON_FOUR_LABEL] = new CommandInputNumber(4);
    this.buttonCommands[CalculatorConstants.BUTTON_FIVE_LABEL] = new CommandInputNumber(5);
    this.buttonCommands[CalculatorConstants.BUTTON_SIX_LABEL] = new CommandInputNumber(6);
    this.buttonCommands[CalculatorConstants.BUTTON_SEVEN_LABEL] = new CommandInputNumber(7);
    this.buttonCommands[CalculatorConstants.BUTTON_EIGHT_LABEL] = new CommandInputNumber(8);
    this.buttonCommands[CalculatorConstants.BUTTON_NINE_LABEL] = new CommandInputNumber(9);
    this.buttonCommands[CalculatorConstants.BUTTON_ZERO_LABEL] = new CommandInputNumber(0);
    // Communtive Operators
    this.buttonCommands[CalculatorConstants.BUTTON_ADD_LABEL] = new CommandInputOperator(CalculatorConstants.BUTTON_ADD_LABEL);
    this.buttonCommands[CalculatorConstants.BUTTON_SUBTRACT_LABEL] = new CommandInputOperator(CalculatorConstants.BUTTON_SUBTRACT_LABEL);
    this.buttonCommands[CalculatorConstants.BUTTON_MULTIPLY_LABEL] = new CommandInputOperator(CalculatorConstants.BUTTON_MULTIPLY_LABEL);
    this.buttonCommands[CalculatorConstants.BUTTON_DIVIDE_LABEL] = new CommandInputOperator(CalculatorConstants.BUTTON_DIVIDE_LABEL);
    this.buttonCommands[CalculatorConstants.BUTTON_EQUALS_LABEL] = new CommandInputOperator(CalculatorConstants.BUTTON_EQUALS_LABEL);
    // Non-commutive Operators
    this.buttonCommands[CalculatorConstants.BUTTON_DECIMAL_POINT_LABEL] = new CommandInputDecimalPoint();
    this.buttonCommands[CalculatorConstants.BUTTON_PLUS_MINUS_LABEL] = new CommandInputPlusMinus();
    this.buttonCommands[CalculatorConstants.BUTTON_CLEAR_ENTRY_LABEL] = new CommandInputClearEntry();
    this.buttonCommands[CalculatorConstants.BUTTON_CLEAR_LABEL] = new CommandInputClear();
    this.buttonCommands[CalculatorConstants.BUTTON_BACKSPACE_LABEL] = new CommandInputBackspace();

  }

  buttonClick(label: string) {
    console.log(label);
    // Get button matching label
    const button = this.buttonCommands[label];
    if (button) {
      button.pressButton(this);
    }
  }

  reset() {
    this.resetInput();
    this.calculation = '';
    this.currentTotal = 0;
  }

  resetInput(): string {
    this.input = '0';
    return this.input;
  }

  appendInput(append: string): string {
    // If the input is '0' then replace it.
    if (this.input === '0') {
      this.input = '';
    }

    // Don't append '.' if there is already a decimal point
    if (append === '.' && this.input.includes('.')) {
      return;
    }

    this.input += append;
    this.inputDisplay = 'input';
    return this.input;
  }

  appendCalculation(append: string): string {
    this.calculation += ' ' + append;
    return this.calculation;
  }

  performCalculation(calculation: string): number {
    this.currentTotal = eval(calculation);
    this.inputDisplay = 'currentTotal';
    return this.currentTotal;
  }

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  label: string;
}

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
    // Move input number to calculation string.
    calc.appendCalculation(calc.input);
    // Perform calculation
    calc.performCalculation(calc.calculation);
    // Append operator
    calc.appendCalculation(this.label);
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

export class CalculatorConstants {
  // Numbers
  public static readonly BUTTON_ONE_LABEL: string = '1';
  public static readonly BUTTON_TWO_LABEL: string = '2';
  public static readonly BUTTON_THREE_LABEL: string = '3';
  public static readonly BUTTON_FOUR_LABEL: string = '4';
  public static readonly BUTTON_FIVE_LABEL: string = '5';
  public static readonly BUTTON_SIX_LABEL: string = '6';
  public static readonly BUTTON_SEVEN_LABEL: string = '7';
  public static readonly BUTTON_EIGHT_LABEL: string = '8';
  public static readonly BUTTON_NINE_LABEL: string = '9';
  public static readonly BUTTON_ZERO_LABEL: string = '0';
  // Commutive Operators
  public static readonly BUTTON_ADD_LABEL: string = '+';
  public static readonly BUTTON_SUBTRACT_LABEL: string = '-';
  public static readonly BUTTON_MULTIPLY_LABEL: string = '*';
  public static readonly BUTTON_DIVIDE_LABEL: string = '/';
  // Non-commutive Operators
  public static readonly BUTTON_EQUALS_LABEL: string = '=';
  public static readonly BUTTON_DECIMAL_POINT_LABEL: string = '.';
  public static readonly BUTTON_PLUS_MINUS_LABEL: string = '+/-';

  public static readonly BUTTON_CLEAR_ENTRY_LABEL: string = 'CE';
  public static readonly BUTTON_CLEAR_LABEL: string = 'C';
  public static readonly BUTTON_BACKSPACE_LABEL: string = '<-';
}
