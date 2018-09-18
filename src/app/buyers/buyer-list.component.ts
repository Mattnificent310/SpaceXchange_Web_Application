import { Component, OnInit } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";
import { BuyerService } from './buyer.service';
import { Buyer } from './buyer.model';

@Component({
    selector: 'at-buyers',
    templateUrl: './buyer.component.html',
    styleUrls: ['./buyer.component.css']
  })
export class BuyerComponent implements OnInit {
    buyerList: Buyer[] = [];
    constructor(private service: BuyerService) {}

    total = 0;
    ngOnInit() {
        this.getAllBuyers();
    }
       getAllBuyers() {
           this.service.getAllBuyers().subscribe(
               data => {
                    this.buyerList = data;
                    this.total = this.buyerList.length;
                    console.log(this.total);
               }
           );
       }

}
