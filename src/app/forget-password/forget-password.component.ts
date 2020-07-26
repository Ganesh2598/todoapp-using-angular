import { Component, OnInit } from '@angular/core';
import M from "materialize-css";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor() { }

  email = null

  ngOnInit(): void {
  }

  onSubmit = () =>{
    if (this.email){
      fetch("http://localhost:5000/reset",{
          method : "post",
          headers : { "Content-Type" : "application/json"},
          credentials : "include",
          body : JSON.stringify({
              email : this.email
          })
      }).then(response =>response.json())
      .then(data =>{
          
          if (data.error){
              M.toast({html : data.error, classes : "rounded red-button"})
          }else{
              //console.log(data)
              M.toast({html : "Check on your mail", classes : "rounded green-button"})
          }
      })
  }else{
      M.toast({html : "No empty field", classes : "rounded red-button"})
  }
  }

}
