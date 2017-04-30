import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: 'modules/sms/sms-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmsListComponent implements OnInit {
  
  items: Array<Object> = [];

  ngOnInit(): void {
    this.items.push({ name: "Apples" });
    this.items.push({ name: "Bananas" });
    this.items.push({ name: "Oranges" });
  }

}
