import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BookingsComponent } from "./bookings.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BookingsComponent", () => {

  let fixture: ComponentFixture<BookingsComponent>;
  let component: BookingsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BookingsComponent]
    });

    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;

  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });

});
