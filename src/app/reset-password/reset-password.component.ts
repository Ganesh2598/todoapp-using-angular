import { Component, OnInit } from '@angular/core';
import M from "materialize-css";
import { ActivatedRoute, Router } from "@angular/router"

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _route : ActivatedRoute, private _router : Router) { }

  userData = {
    password : "",
    conformpassword : ""
  }

  ngOnInit(): void {
  }

  onSubmit = () =>{
    if (this.userData.password !== this.userData.conformpassword){
      M.toast({html : "Password mismatch", classes : "rounded red-button"})
  }else{
      fetch("http://localhost:5000/resetpassword",{
          method : "post",
          headers : { "Content-Type" : "application/json"},
          credentials : "include",
          body : JSON.stringify({
              password : this.userData.password,
              token : this._route.snapshot.paramMap.get("token")
          })
      })
      .then(data=> {
              //console.log(data)
              M.toast({html : "Password Changed", classes : "rounded green-button"})
              this._router.navigate(["/login"])
      })
  }
  }

}
