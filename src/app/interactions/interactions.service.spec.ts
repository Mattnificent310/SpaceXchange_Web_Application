import { InteractionsService } from "./interactions.service";
import { TestBed } from "@angular/core/testing";

describe("InteractionsService", () => {

  let service: InteractionsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InteractionsService
      ]
    });
    service = TestBed.get(InteractionsService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
