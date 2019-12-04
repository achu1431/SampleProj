import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  ProductService
} from '../product.service';
import {
  Subscription
} from 'rxjs';
import {
  HeaderDialogComponent
} from '../header/header.component';
import {
  MatDialog
} from '@angular/material';
import { LoginService } from '../login.service';
import { Options, LabelType } from 'ng5-slider';
declare let alertify: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public containerHeight;
  public temp;
  public prodSubScrip: Subscription;
  public getProdSubscrip: Subscription;
  public roleSubscrip: Subscription;
  public products: any = [];
  public role;
  public minValue = 0;
  public maxValue = 50000;
  options: Options = {
    floor: 0,
    ceil: 50000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> ₹' + value;
        case LabelType.High:
          return '<b>Max price:</b> ₹' + value;
        default:
          return '₹' + value;
      }
    }
  };
  constructor(public prodServ: ProductService, public dialog: MatDialog, public loginservice: LoginService) {
    this.getProdSubscrip = this.prodServ.productsSub.subscribe(data => {
      this.products = data;
    })

    this.roleSubscrip = this.loginservice.roleListener.subscribe(data => {
      this.role = data;
    });
  }

  ngOnInit() {
    this.temp = document.getElementsByTagName('body')[0];
    this.containerHeight = this.temp.offsetHeight - 64;
    this.prodSubScrip = this.prodServ.fetchProducts().subscribe(result => {
      this.products = result['data'];
    });
  }

  ngOnDestroy() {
    if (this.prodSubScrip) this.prodSubScrip.unsubscribe();
    if (this.roleSubscrip) this.roleSubscrip.unsubscribe();
    if (this.getProdSubscrip) this.getProdSubscrip.unsubscribe();
  }

  delete(product) {
    if (product) {
      this.prodServ.deleteProduct(product).subscribe(data => {
        alertify.success(data.message)
        this.prodServ.productsSub.next(data.products);
      })
    }
  }

  edit(product) {

    const dialogRef = this.dialog.open(HeaderDialogComponent, {
      width: '320px',
      height: '340px',
      data: {
        pName: product.productName,
        price: product.productPrice
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          productName: result.pName,
          price: result.price,
          productId: product.productId,
          id: product._id
        };
        console.log(data)
        this.prodServ.editProduct(data).subscribe(data => {
          alertify.success(data.message);
          this.prodServ.productsSub.next(data.products);
        })
      }
    });
  }

  sort(type) {
    if (type) {
      const sortData = {
        sortBy: type
      };
      this.prodServ.sortProduct(sortData).subscribe(data => {
        alertify.success(data.message);
        this.prodServ.productsSub.next(data.products);
      })
    }
  }

  sliderPrice() {
    const slideData = {
      minValue: this.minValue,
      maxValue: this.maxValue
    }

    this.prodServ.sortSlider(slideData).subscribe(data => {
      this.prodServ.productsSub.next(data.products);
    })
  }

}
