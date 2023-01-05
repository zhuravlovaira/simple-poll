import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-poll-creator',
  templateUrl: './poll-creator.component.html',
  styleUrls: ['./poll-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollCreatorComponent {}
