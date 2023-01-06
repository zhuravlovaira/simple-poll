import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoterComponent {
  @Input() question: string = '';
  @Input() answers: string[] = [];
}
