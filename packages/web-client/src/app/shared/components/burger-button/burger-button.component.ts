import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'burger-button',
  template: `<div></div>`,
  styleUrls: ['./burger-button.component.scss'],
  host: {
    '[class.focused]': 'asdasd'
  }
})
export class BurgerButtonComponent implements OnInit {

  @Input() focused: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
