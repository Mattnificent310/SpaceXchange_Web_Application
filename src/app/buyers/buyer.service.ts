import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Buyer} from './buyer.model';
@Injectable()
export class BuyerService {
    webApiUrl = 'http://18.203.81.222:8083/users';
    constructor(private http: HttpClient) {}
    getAllBuyers(): any {
        return this.http.get<Buyer[]>(this.webApiUrl);
    }
}
