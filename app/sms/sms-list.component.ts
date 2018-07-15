import { GroupMessages } from '../util/GroupMessages';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as TNSInbox from 'nativescript-sms-inbox';
import * as app from "application";

@Component({
  selector: 'home',
  moduleId: module.id,
  templateUrl: './sms-list.component.html',
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
  
    TNSInbox.getInboxes({ max: 100 }).then
      (
        (res) => 
        {
          let grouper = new GroupMessages();
          this.items = grouper.doGroup
          (
            res.data
            .filter((msg)=>{  return msg.message.match(/bradesco/gi); })
            .map((res) => { return res.message; })
          ).map((res)=>{return {name:res}});
          //console.log("Fim do agrupamento de mensagens");
        }, 
        (err) => { console.log(err); }
      );

  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}
}
