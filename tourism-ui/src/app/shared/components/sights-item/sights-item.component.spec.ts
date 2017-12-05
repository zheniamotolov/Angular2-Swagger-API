import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SightsItemComponent } from './sights-item.component';

describe('SightsItemComponent', () => {
  let component: SightsItemComponent;
  let fixture: ComponentFixture<SightsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SightsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
