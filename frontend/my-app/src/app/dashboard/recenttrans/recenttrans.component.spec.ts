import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenttransComponent } from './recenttrans.component';

describe('RecenttransComponent', () => {
  let component: RecenttransComponent;
  let fixture: ComponentFixture<RecenttransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecenttransComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecenttransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
