import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CalculatorService {
  constructor(private http: HttpClient) { }

  calculateString(calculationString: string) {
    return this.http.post<number>('/calculate', calculationString);
  }
}