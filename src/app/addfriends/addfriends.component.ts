import { Component, OnInit } from '@angular/core';
import M from "materialize-css";
import { Router } from "@angular/router" 

@Component({
  selector: 'app-addfriends',
  templateUrl: './addfriends.component.html',
  styleUrls: ['./addfriends.component.css']
})
export class AddfriendsComponent implements OnInit {

  constructor(private _router : Router) { }
  friendsData = null;

  addHandler = (id, name, url)=> {
    fetch("http://localhost:5000/addfriend",{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "post",
                    body : JSON.stringify({
                        friendname : name,
                        url : url,
                        myid : id
                    })
            }).then(res => res.json())
            .then(data =>{
                M.toast({html : "Added to friend list", classes : "rounded green-button"})
                this._router.navigate(["/myfriends"])
            })
            .catch(err =>{
                console.log(err)
            })
  }

  ngOnInit(): void {
    fetch("http://localhost:5000/allfriends",{
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
