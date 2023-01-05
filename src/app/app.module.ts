import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SimplePollModule } from './simple-poll/simple-poll.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SimplePollModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
