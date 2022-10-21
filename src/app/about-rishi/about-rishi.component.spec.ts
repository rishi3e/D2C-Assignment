import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRishiComponent } from './about-rishi.component';

describe('AboutRishiComponent', () => {
  let component: AboutRishiComponent;
  let fixture: ComponentFixture<AboutRishiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutRishiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRishiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
