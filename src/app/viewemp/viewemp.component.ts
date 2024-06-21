import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewemp',
  templateUrl: './viewemp.component.html',
  styleUrls: ['./viewemp.component.css']
})
export class ViewempComponent implements OnInit {
isEMPData:any;
  constructor(private sharedService:SharedService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //below we will check browser support localstorage or not
    if(typeof (Storage) != undefined){
      let emp:any=localStorage.getItem('empdata');
      this.isEMPData=JSON.parse(emp);
      console.log("empData",this.isEMPData);
    }
  }
//Delete Record Function
deleteEmp(key:any){
  this.sharedService.deleteRecord(key);

}
editEmpDetail(empdetails:any){
  this.router.navigateByUrl("/addNewEmployee?EmailID="+empdetails);

}
}
