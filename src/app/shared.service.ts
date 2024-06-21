import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const usersKey = 'empdata';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  
  register(empData:any) {
    //pushing new data into array
    users.push(empData);
    //set data into localStorage
    localStorage.setItem(usersKey, JSON.stringify(users));
    this.router.navigateByUrl("/viewEmploye");
} 

//Delete Record
deleteRecord(key:any){
  let emp:any=localStorage.getItem('empdata');
  let empData=JSON.parse(emp);
  const emprecords = empData.filter(x => x.email != key);
  localStorage.setItem(usersKey, JSON.stringify(emprecords));
this.reloadPage();
}
updateEmpData(id:any,updateData:any){
  let emp:any=localStorage.getItem('empdata');
  let empData=JSON.parse(emp);
  let user = empData.find(x => x.email ==id);
  console.log("user",user);
  console.log("updateData",updateData);
  // update and save user
  Object.assign(user, updateData);
  console.log("user",user);
  console.log("hhh",users)

  //console.log("jjjj",Object.entries(user))

  localStorage.setItem(usersKey, JSON.stringify(empData));
  this.router.navigateByUrl("/viewEmploye");
}
//Reload Page
reloadPage() {
  window.location.reload();
}


}
