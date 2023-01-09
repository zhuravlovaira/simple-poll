import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { PollChartComponent } from './poll-chart/poll-chart.component';
import { PollCreatorComponent } from './poll-creator/poll-creator.component';
import { SimplePollComponent } from './simple-poll.component';
import { VoterComponent } from './voter/voter.component';

@NgModule({
  declarations: [
    SimplePollComponent,
    PollCreatorComponent,
    VoterComponent,
    PollChartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,
    RadioButtonModule,
    ChartModule,
    MessageModule,
  ],
  exports: [SimplePollComponent],
})
export class SimplePollModule {}
