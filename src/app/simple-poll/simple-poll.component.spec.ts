import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePollComponent } from './simple-poll.component';

describe('SimplePollComponent', () => {
  let component: SimplePollComponent;
  let fixture: ComponentFixture<SimplePollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimplePollComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimplePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
