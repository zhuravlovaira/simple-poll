import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollCreatorComponent } from './poll-creator.component';

describe('PollCreatorComponent', () => {
  let component: PollCreatorComponent;
  let fixture: ComponentFixture<PollCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PollCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
