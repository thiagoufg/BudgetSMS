import { GroupMessages } from '../util/GroupMessages';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as TNSInbox from 'nativescript-sms-inbox';
import * as app from "application";
import * as permissions from "nativescript-permissions";

@Component({
  selector: 'home',
  moduleId: module.id,
  templateUrl: './sms-pattern-list.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmsPatternListComponent implements OnInit {

  items: Array<Object> = [];

  ngOnInit(): void {
    setTimeout(this.dealWithPermissions.bind(this),1000);
  }
  
  public dealWithPermissions(){
    const self = this;
    if(!permissions.hasPermission("android.permission.READ_SMS")) {
      permissions.requestPermission("android.permission.READ_SMS")
      .then(() => {
        self.getInboxMessages();
      })
      .catch((error) =>  {
        alert("Uh oh, no permissions - plan B time!" + JSON.stringify(error));
        this.items.push({ name: "Apples" });
        this.items.push({ name: "Bananas" });
        this.items.push({ name: "Oranges" });
      });
    } else {
      this.getInboxMessages();
    }
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
      ).catch((error) => {
        alert("Error fetching sms: " + error);
      });

  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}
}
