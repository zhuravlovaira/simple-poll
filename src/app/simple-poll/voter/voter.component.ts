import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoterComponent {}
