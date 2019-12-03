import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ProductService } from '../product.service';
declare let alertify: any;

export interface DialogData {
  productName: string;
  price: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userIsAuthenticated = false;
  public authSubscrip: Subscription;
  public roleSubscrip: Subscription;

  public productName;
  public price;

  public roleName;
  constructor(public loginserv: LoginService, public router: Router,public dialog: MatDialog, public prodServ: ProductService) { }

  ngOnInit() {
    this.authSubscrip = this.loginserv.authStatusListener.subscribe((data:boolean) =>{
      this.userIsAuthenticated = data;
    });
    this.roleSubscrip = this.loginserv.roleListener.subscribe(data =>{
      this.roleName = data;
    });
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(HeaderDialogComponent, {
      width: '320px',
      height: '340px',
      data: {pName: this.productName, price: this.price}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
         productName: result.pName,
         price: result.price
        };
        this.prodServ.addProduct(data).subscribe(data =>{
          if(data) {
            console.log(data)
            alertify.success(data.message);
            this.prodServ.productsSub.next(data.products)
          }
        })
      }});
    
  }

  Onlogout() {
    this.loginserv.authStatusListener.next(false);
    this.router.navigate(['/login'], {replaceUrl: true});
  }

  ngOnDestroy(){
    if(this.authSubscrip) this.authSubscrip.unsubscribe();
    if(this.roleSubscrip) this.roleSubscrip.unsubscribe();
    }

  

}

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header.component.dialog.html',
  styles: ['.example-full-width{width:100%}', 'h3{font-family: "Varela Round", sans-serif;', '.mat-stroked-button{margin-left: 4px;}']
})
export class HeaderDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HeaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}
