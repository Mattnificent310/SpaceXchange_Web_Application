import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
@Injectable()
export class ProfileService {
  url = "http://63.32.26.64:8083/users/";
  constructor(private http: Http) {}
  updateProfile(profile) {
    return this.http.put(this.url + profile.id, profile);
  }
}
