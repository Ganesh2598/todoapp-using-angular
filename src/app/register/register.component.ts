import { Component, OnInit } from '@angular/core';
import M from "materialize-css"
import { Router } from "@angular/router" 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }

  registerData = {
    name : "",
    email : "",
    password : "",
    image : ""
  };

  uploadFile = (data) => {
    this.registerData.image = data;
  }


  onSubmit(){
    const formData = new FormData();
    formData.append("file",this.registerData.image);
    formData.append("upload_preset","letsmingle");
    formData.append("cloud_name","dvezzidsw");
    fetch("https://api.cloudinary.com/v1_1/dvezzidsw/image/upload",{
        method : "post",
        body : formData
    })
        .then(response =>response.json())
        .then(data =>{
             if (data.error){
                M.toast({html : data.error.message, classes : "rounded red-button"})
                console.log(data.error)
              }else{
                this.registerData.image = data.url
                 //console.log(this.registerData)
                 fetch("http://localhost:5000/register",{
                  method : "post",
                  headers : { "Content-Type" : "application/json"},
                  credentials : "include",
                  body : JSON.stringify({
                      name : this.registerData.name,
                      email : this.registerData.email,
                      password : this.registerData.password,
                      url : this.registerData.image
                  })
              }).then(response => response.json())
              .then(data =>{
                  //console.log(data)
                  if (data.error){
                      M.toast({html : data.error, classes : "rounded red-button"})
                  }else{
                      M.toast({html : "Successfully Registered", classes : "rounded green-button"})
                      this._router.navigate(["/login"])
                  }
              })
              }
         })
  }

}
