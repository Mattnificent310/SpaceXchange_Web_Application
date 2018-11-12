import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ListingsComponent } from "./listings.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ListingsComponent", () => {

  let fixture: ComponentFixture<ListingsComponent>;
  let component: ListingsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ListingsComponent]
    });

    fixture = TestBed.createComponent(ListingsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
