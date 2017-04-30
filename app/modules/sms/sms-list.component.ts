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
    TNSInbox.getInboxes({ max: 20 }).then((res) => {

      let resposta: Array<Object> = res.data;
      this.items = resposta.map((res) => { return { name: res['message'] }; });
      console.dump(this.items);
    }, (err) => { console.log(err); });

  }
}
