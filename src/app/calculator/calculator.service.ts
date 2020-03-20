import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CalculatorService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
    
  };

  calculateString(calculationString: string) {
    return this.http.post<number>('calculator', '"' + calculationString + '"', this.httpOptions);
  }
}