import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ConstructionComponent } from "./construction.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ConstructionComponent", () => {

  let fixture: ComponentFixture<ConstructionComponent>;
  let component: ConstructionComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ConstructionComponent]
    });

    fixture = TestBed.createComponent(ConstructionComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
