import { Component, OnInit } from '@angular/core';
import { accessRequest } from 'src/app/models/accessRequest';
import { usersList } from 'src/app/models/usersList';
import { RolesService } from 'src/app/services/roles.service';
import { UserRole } from 'src/app/models/userRole';
import { FormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})

export class AdminToolsComponent implements OnInit {
  public requests: accessRequest[] = []
  public allUsers: User[] = []
  public activeRoles: UserRole[] = []

  public focusedAccessRequest: accessRequest = {
    id: 0,
    username: "",
    name: "",
    currentRole: "",
    requestedRole: "",
    reasons: "",

    responseRole: "",
    responseMessage: "",
  }

  constructor(private roles: RolesService, private admin: AdminService, private formsModule: FormsModule) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.roles.getAllActiveRoles().then((value) => {
      this.activeRoles = value;
    });

    this.admin.getAllUsers().then((value) => {
      this.allUsers = value
    });
    // this.getDummyRequests().then((value) => {
    //   this.requests = value;
    // });
    // this.getDummyUserslist().then((value) => {
    //   this.allUsers = value;
    // });
  }

  public setFocusedAccessRequest(request: accessRequest) {
    this.focusedAccessRequest = request;
    console.log("request for modal set");
  }

  public removeUser(user: usersList) {
    console.log(user.role);
    console.log(user.isActive);
    console.log("******")
    console.log("TODO: Make api call to Remove User user:")
    console.log(user)
    console.log("******")
  }

  public setUserRole(user: usersList, role: UserRole) {
    user.role = role.role
    console.log("******")
    console.log("TODO: Make api call to set role on user:")
    console.log(user)
    console.log("New Role:")
    console.log(role)
    console.log("******")
  }

  public userActiveStatusChanged(user: usersList, isActive: boolean) {
    console.log("******")
    console.log("TODO: Make api call to Activate/DeActivate user access:")
    console.log(user)
    console.log("Account status active:")
    console.log(isActive)
    console.log("******")
  }

  async getDummyRequests(): Promise<accessRequest[]> {
    const names = ["Mike Shasko", "Roop Jawl", "Pushan Mitra", "Kendall Olsen", "Jake Morris", "Amir Shayegh"]
    var requests: accessRequest[] = []
    // const allroles = this.activeRoles;
    // names.forEach((item, index) => {
    //   const randomInitialRole = Math.floor(Math.random() * 3) + 0
    //   var randomRequestedRole = Math.floor(Math.random() * 3) + 0
    //   while (randomRequestedRole == randomInitialRole) {
    //     randomRequestedRole = Math.floor(Math.random() * 3) + 0;
    //   }
    //   const currentRoleName = allroles.find(x => x.role_code_id === randomInitialRole).role;
    //   const requestedRoleName = allroles.find(x => x.role_code_id === randomRequestedRole).role;
    //   const request: accessRequest = {
    //     id: index,
    //     username: item.replace(/\s/g, "").toLowerCase(),
    //     name: item,
    //     currentRole: currentRoleName,
    //     requestedRole: requestedRoleName,
    //     reasons: "My reasons and stuff for " + item,

    //     responseRole: requestedRoleName,
    //     responseMessage: ""
    //   }
    //   requests.push(request)
    // });
    return requests;
  }

  async getDummyUserslist(): Promise<usersList[]> {
    var usersList: usersList[] = []
    let requests = await this.getDummyRequests()
    requests.forEach((item, index) => {
      const userListItem: usersList = {
        id: item.id,
        username: item.username,
        firstName: item.name.split(" ")[0],
        lastName: item.name.split(" ")[1],
        email: item.username + "@gov.bc.ca",
        role: item.currentRole,
        isActive: true,
      }
      usersList.push(userListItem);
    });
    return usersList
  }
}
