import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import * as TNSInbox from 'nativescript-sms-inbox';

@Component({
  selector: 'home',
  templateUrl: 'modules/sms/sms-list.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmsListComponent implements OnInit {

  items: Array<Object> = [];

  ngOnInit(): void {
    this.getInboxMessages();
    this.items.push({ name: "Apples" });
    this.items.push({ name: "Bananas" });
    this.items.push({ name: "Oranges" });
  }

  public getInboxMessages() { //fromNumber = "0712345678"
    TNSInbox.getInboxes({ max: 2000 }).then((res) => {

      this.items = res.data
      .filter((msg)=>{  return msg.message.match(/bradesco/gi); })
      .map((res) => { return { name: res.message }; });
    }, (err) => { console.log(err); });

  }
}
