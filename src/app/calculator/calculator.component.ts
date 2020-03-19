import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tiles: Tile[] = [
    {text: 'CE', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'C', cols: 1, rows: 1, color: 'lightpink'},
    {text: '<-', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '/', cols: 1, rows: 1, color: 'lightblue'},
    {text: '7', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '8', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '9', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '*', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '4', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '5', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '6', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '-', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '1', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '2', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '3', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '+', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '+/-', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '0', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '.', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: '=', cols: 1, rows: 1, color: '#DDBDF1'},
  ];

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
