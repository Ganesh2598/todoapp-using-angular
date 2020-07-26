import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private _route : ActivatedRoute) { }
  userData = null;
  postData = null;
  friendData = null;


  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get("id");
    fetch(`http://localhost:5000/userinfo/${id}`,{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "get"
            }).then(res => res.json())
            .then(data =>{
                this.userData = data
                fetch(`http://localhost:5000/userfriends/${id}`,{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "get",
                }).then(res =>res.json())
                .then(friends =>{
                  this.friendData = friends
                    fetch(`http://localhost:5000/userpost/${id}`,{
                    headers : { "Content-Type" : "application/json" ,"Authorization" : "Bearer "+localStorage.getItem("token")},
                    credentials : "include",
                    method : "get"
                }).then(res => res.json())
                .then(data =>{
                  this.postData = data
                    //console.log(data)
                })
                .catch(err =>{
                    console.log(err)
                })
                })
            })
            .catch(err =>{
                console.log(err)
            })
  }

}
