import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsLiabilitiesComponent } from './assets-liabilities.component';

describe('AssetsLiabilitiesComponent', () => {
  let component: AssetsLiabilitiesComponent;
  let fixture: ComponentFixture<AssetsLiabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsLiabilitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetsLiabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
