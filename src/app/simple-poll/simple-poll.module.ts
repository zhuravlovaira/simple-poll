import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
  imports: [CommonModule],
  exports: [SimplePollComponent],
})
export class SimplePollModule {}
