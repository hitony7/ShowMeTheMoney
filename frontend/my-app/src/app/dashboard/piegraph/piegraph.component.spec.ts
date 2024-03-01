import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiegraphComponent } from './piegraph.component';

describe('PiegraphComponent', () => {
  let component: PiegraphComponent;
  let fixture: ComponentFixture<PiegraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiegraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
