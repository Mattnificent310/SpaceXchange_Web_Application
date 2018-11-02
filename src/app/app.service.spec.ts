import { AppService } from "./app.service";
import { TestBed } from "@angular/core/testing";

describe("AppService", () => {

  let service: AppService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService
      ]
    });
    service = TestBed.get(AppService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
