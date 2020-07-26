import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import M from "materialize-css";

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private _router : Router) { }

  postData = {
    description : "",
    image : "",
    option : ""
  }

  ngOnInit(): void {
  }

  uploadFile = (file) => {
    this.postData.image = file
  }

  optionChange = (option) => {
    this.postData.option = option
  }

  onSubmit = () => {
    const formData = new FormData();
    formData.append("file",this.postData.image);
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
            }else{
                this.postData.image = data.url
                //console.log(this.postData)
                if (this.postData.option) {
                  fetch("http://localhost:5000/createpost",{
                      headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                      credentials : "include",
                      method : "post",
                      body : JSON.stringify({
                          caption : this.postData.description,
                          url : this.postData.image,
                          status : "public"
                      })
                  }).then(response =>response.json())
                  .then(data =>{
                      if (!data.error){
                          //console.log(data)
                            M.toast({html : "Posted!!!", classes : "rounded green-button"})
                            this._router.navigate(["/home"])
                      }else{
                            M.toast({html : data.error, classes : "rounded red-button"})
                      }
                  })
              }else{
                  fetch("http://localhost:5000/createpost",{
                          headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                          credentials : "include",
                          method : "post",
                          body : JSON.stringify({
                              caption : this.postData.description,
                              url : this.postData.image,
                              status : "private"
                          })
                      }).then(response =>response.json())
                      .then(data =>{
                          if (!data.error){
                              //console.log(data)
                              M.toast({html : "Posted!!!", classes : "rounded green-button"})
                              this._router.navigate(["/home"])
                          }else{
                              M.toast({html : data.error, classes : "rounded red-button"})
                          }
                      })
                    }
              }
            
        })
    
      }
}
