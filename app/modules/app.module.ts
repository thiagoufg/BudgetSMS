import { NgModule } from '@angular/core';

import { NativeScriptModule } from "nativescript-angular/platform";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmsListComponent } from './sms/sms-list.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from './shared';

@NgModule({
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    SmsListComponent,
    AboutComponent,
    ContactComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
