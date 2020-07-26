import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import M from "materialize-css"

@Component({
  selector: 'app-myfriends',
  templateUrl: './myfriends.component.html',
  styleUrls: ['./myfriends.component.css']
})
export class MyfriendsComponent implements OnInit {

  constructor(private _router : Router) { }
  friendsData = null

  deleteHandler = (id) =>{
    fetch(`http://localhost:5000/removefriend/${id}`,{
                headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                credentials : "include",
                method : "delete"
        }).then(res => res.json())
        .then(data =>{
            M.toast({html : "Removed from friend list", classes : "rounded green-button"})
            this._router.navigate(["/addfriends"])
        })
        .catch(err =>{
            console.log(err)
        })
      }

  ngOnInit(): void {
    fetch("http://localhost:5000/myfriends",{
                headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                credentials : "include",
                method : "get"
        }).then(res => res.json())
        .then(data =>{
            //console.log(data)
            this.friendsData = data
        })
        .catch(err =>{
            console.log(err)
        })
  }

}
