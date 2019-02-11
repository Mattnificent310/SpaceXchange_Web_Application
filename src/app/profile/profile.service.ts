import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
@Injectable()
export class ProfileService {
  url = "http://63.32.26.64:8083/users/1";
  constructor(private http: Http) {}
  updateProfile(profile) {
    const data = {
      id: 1,
      avatar: profile.profileImage,
      name: profile.name,
      surname: profile.surname,
      birthDate: profile.birth,
      phone: profile.phone,
      email: profile.email,
      password: ""
    };
    return this.http.put(this.url, profile);
  }
}
