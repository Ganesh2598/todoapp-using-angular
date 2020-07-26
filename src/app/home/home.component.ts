import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import M from "materialize-css";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router : Router) { }

  userData = JSON.parse(localStorage.getItem("user"))
  postData = null;
  peopleData = null;

  addComment = (comment, fk_postid) => {
    fetch("http://localhost:5000/addcomment",{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "post",
                    body : JSON.stringify({
                        fk_postid : fk_postid,
                        comment : comment
                    })
                }).then(response =>response.json())
                .then(data =>{
                    if (!data.error){
                        location.reload()
                        M.toast({html : "Posted!!!", classes : "rounded green-button"})
                        
                    }else{
                        M.toast({html : data.error, classes : "rounded red-button"})
                    }
                })
}

onSelect = (id) =>{
    this._router.navigate(["/userprofile",id])
} 

addChildComment = (comment, fk_commentid) => {
    fetch("http://localhost:5000/addsubcomment",{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "post",
                    body : JSON.stringify({
                        fk_commentid : fk_commentid,
                        comment : comment
                    })
                }).then(response =>response.json())
                .then(data =>{
                    if (!data.error){
                        location.reload()
                        M.toast({html : "Posted!!!", classes : "rounded green-button"})
                        
                    }else{
                       M.toast({html : data.error, classes : "rounded red-button"})
                    }
                })
}

  ngOnInit(): void {
    fetch("http://localhost:5000/allpost",{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "get"
            }).then(res => res.json())
            .then(data =>{
                console.log(data)
                this.postData = data
                fetch("http://localhost:5000/everyone",{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "get"
                }).then(res=> res.json())
                .then(data=>{
                    //console.log(data)
                    if (data.error){
                        console.log(data.error)
                    }else{
                        this.peopleData = data
                    }
                })
            })
            .catch(err =>{
                console.log(err)
            })

    
  }

}
