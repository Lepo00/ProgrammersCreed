import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { RouterServiceService } from 'src/app/services/router-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuList:MenuItem[]=[];
  cerca:boolean;
  @Input()
  version: number;
  @Input()
  nome:string;

  constructor(private router: Router, private location: Location, private routerService:RouterServiceService) {
  }

  createMenu(){
    if(this.version===1 || this.version==3 || this.version==4){
      this.menuList=[     
        { id:1, desc:"Home"},
        { id:2, desc:"List"},
        { id:3, desc:"Cards"},
        { id:4, desc:"Feedback"},
        { id:5, desc:"Profile"},
        { id:6, desc:"Exit"},
      ]
    }
    else if(this.version===2){
      this.menuList=[     
        { id:7, desc:this.nome},
      ];
    }
  }

  ngOnInit(): void {
    this.createMenu();
  }

  change(item:MenuItem){
    if(item.id===6){
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
      this.router.navigateByUrl('login');
    }
    else if(item.id===7){
      this.router.navigateByUrl('list');
    }
    else{
      if(item!=null){
        this.routerService.navigateTo(item.desc.toLowerCase());
      }
      else{
        this.routerService.navigateTo("/home");
      }
      
    }
  }

  ricercaL(s:string){
    this.router.navigateByUrl("list/"+s);
  }

  ricercaC(s:string){
    this.router.navigateByUrl("cards/"+s);
  }

  back(){
    this.location.back();
  }
}

