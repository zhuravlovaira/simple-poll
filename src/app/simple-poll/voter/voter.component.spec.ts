import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  const selectedIndex = 2;

  beforeEach(async () => {
    component = new VoterComponent();
    spyOn(component.addVote, 'next');
  });

  describe('vote method', () => {
    it('should not emit data if selectedIndex is NOT defined', () => {
      component.selectedIndex = null;
      component.vote();
      expect(component.addVote.next).not.toHaveBeenCalled();
    });

    it('should emit data if selectedIndex is defined', () => {
      component.selectedIndex = selectedIndex;
      component.vote();
      expect(component.addVote.next).toHaveBeenCalledWith(selectedIndex);
    });
  });
});
