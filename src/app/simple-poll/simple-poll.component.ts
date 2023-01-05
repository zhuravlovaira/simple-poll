import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-simple-poll',
  templateUrl: './simple-poll.component.html',
  styleUrls: ['./simple-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimplePollComponent {}
