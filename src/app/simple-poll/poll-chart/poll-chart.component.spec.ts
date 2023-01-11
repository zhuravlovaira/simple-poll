import { PollChartComponent } from './poll-chart.component';

describe('PollChartComponent', () => {
  let component: PollChartComponent;
  const initialAnswers = [
    { answer: '12345678910', votes: 3 },
    { answer: 'qwert', votes: 4 },
  ];

  beforeEach(async () => {
    component = new PollChartComponent();
    component.answers = [...initialAnswers];
  });

  it('should calculate proper totalVotes', () => {
    expect(component.totalVotes).toBe(7);
  });

  it('should set proper, truncated labels', () => {
    expect(component.basicData.labels).toEqual(['1234567891...', 'qwert']);
  });

  it('should set proper votes', () => {
    expect(component.basicData.datasets[0].data).toEqual([3, 4]);
  });
});
