import {Injectable} from '@angular/core';

@Injectable()
export class DataService {

  constructor() {}

  cars = ['a', 'b', 'c'];

  myData() {
    return 'this my data';
  }
}
