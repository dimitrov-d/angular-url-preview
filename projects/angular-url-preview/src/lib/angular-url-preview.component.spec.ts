import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularUrlPreviewComponent } from './angular-url-preview.component';

describe('AngularUrlPreviewComponent', () => {
  let component: AngularUrlPreviewComponent;
  let fixture: ComponentFixture<AngularUrlPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularUrlPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularUrlPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
