import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import M from "materialize-css";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }

  loginData = {
    email : "",
    password : ""
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
    fetch("http://localhost:5000/login",{
            method : "post",
            headers : { "Content-Type" : "application/json"},
            credentials : "include",
            body : JSON.stringify({
                email : this.loginData.email,
                password : this.loginData.password
            })
        }).then(response => response.json())
        .then(data =>{
            if(!data.error){
                //console.log(data)
                localStorage.setItem("token",data.token)
                localStorage.setItem("user",JSON.stringify(data.data))
                M.toast({html : `Successfully Logged in`, classes : "rounded green-button"})
                this._router.navigate(["/home"])
            }else{
               M.toast({html : data.error, classes : "rounded red-button"})
            }
        })
  }

}
