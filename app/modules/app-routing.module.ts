import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SmsListComponent } from './sms/sms-list.component';
import { SmsPatternList } from './sms/sms-pattern-list.component';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot([
      { path: '', component: AboutComponent },
      { path: 'smsinbox', component: SmsListComponent },
      { path: 'smsintercept', component: SmsPatternList },
      { path: 'contact', component: ContactComponent }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {

}
