import { Component, OnInit } from '@angular/core';
import { Tile } from './Tile';
import {
  Command,
  CommandInputNumber,
  CommandInputOperator,
  CommandInputDecimalPoint,
  CommandInputPlusMinus,
  CommandInputClearEntry,
  CommandInputClear,
  CommandInputBackspace
} from './Command';
import { CalculatorConstants } from './CalculatorConstants';

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
  currentOperator: string;

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
    console.trace({ label });
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
    this.currentOperator = '';
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

  setCurrentOperator(operator: string) {
    this.currentOperator = operator;
  }

  performCalculation(): number {
    // If there is no current operator then cannot perform calculation
    if (!this.currentOperator) {
      this.currentTotal = +this.input;
      return this.currentTotal;
    }
    // If the current operator is equals then do not do the calculation and reset the diplay
    if (this.currentOperator === '=') {
      this.calculation = '';
      if (this.input === '0') {
        this.input = this.currentTotal + '';
      } else {
        this.currentTotal = +this.input;
      }
      return this.currentTotal;
    }

    const calculation = this.currentTotal + this.currentOperator + this.input;
    console.trace({ calculation });
    this.currentTotal = eval(calculation);
    this.inputDisplay = 'currentTotal';
    return this.currentTotal;
  }

}
