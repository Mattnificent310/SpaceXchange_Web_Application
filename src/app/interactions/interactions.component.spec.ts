import { NO_ERRORS_SCHEMA } from "@angular/core";
import { InteractionsComponent } from "./interactions.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("InteractionsComponent", () => {

  let fixture: ComponentFixture<InteractionsComponent>;
  let component: InteractionsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [InteractionsComponent]
    });

    fixture = TestBed.createComponent(InteractionsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
