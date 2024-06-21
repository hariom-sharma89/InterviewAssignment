import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  empForm: FormGroup;
  submitted:boolean= false;
  isEmailAlreadyExits:boolean=false;
  isEmailexist:any;
  updateButton:boolean=false;


  constructor(private formBuilder: FormBuilder,private sharedService:SharedService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //form initiation
    this.empForm = this.formBuilder.group({
      Name: ['', Validators.required],
      CompanyName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phoneno: ['', [Validators.required,Validators.pattern("[0-9]{10}")]],
      designation: ['', Validators.required],
  });
  this.route.queryParams.subscribe(params =>{
this.isEmailexist=params['EmailID'];
console.log("EmailID",this.isEmailexist)
if(this.isEmailexist !=undefined){
  this.editEmp();
}
  })
  }

    // convenience getter for easy access to form fields
    get f() { return this.empForm.controls; }
    
    //Form Submit Function
    submitform(){
      this.submitted=true;
        // stop here if form is invalid
        if (this.empForm.invalid) {
          return;
      }
      //call service method
      this.sharedService.register(this.empForm.value);
      this.empForm.reset();
      
    }

//Edit Emp Details
editEmp(){
  
  let emp:any=localStorage.getItem('empdata');
  let empData=JSON.parse(emp);
  let emprecords = empData.filter(x => x.email == this.isEmailexist);
  this.empForm.patchValue(emprecords[0]);
  this.updateButton=true;
}

//Update Function
updateEmp(){
  this.submitted=true;
        // stop here if form is invalid
        if (this.empForm.invalid) {
          return;
      }
      //call service method
      this.sharedService.updateEmpData(this.isEmailexist,this.empForm.value);
      this.empForm.reset();
      this.updateButton=false;
      
}
//Check Email already Exist or not
    checkEmailExist(event:any){
      if(typeof (Storage) != undefined){
        let emp:any=localStorage.getItem('empdata');
        if(emp){
          let empData=JSON.parse(emp);
          const user = empData.filter(x => x.email == event.target.value);
           console.log("777",user)
           if(user?.length>0){
            console.log("p");
           this.isEmailAlreadyExits=true;
          }
          else{
            this.isEmailAlreadyExits=false;
          }
          console.log("empData",empData); 
        }
      }
    }
}
