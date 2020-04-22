import { Component, OnInit } from '@angular/core';
import { SerieService } from 'src/app/services/serie.service';
import { Serie } from 'src/app/models/serie.interface';
import { MyHttpService } from 'src/app/services/my-http.service';

@Component({
  selector: 'app-list-serie',
  templateUrl: './list-serie.component.html',
  styleUrls: ['./list-serie.component.scss']
})
export class ListSerieComponent implements OnInit {
  daMostrare;
  mostra:boolean;
  serie: Serie[];
 
  constructor(private myHttpService: MyHttpService,private serieService:SerieService) { 
    this.mostra=false;
    
  }
 
  ngOnInit(): void {
    this.myHttpService.getSerie().subscribe(reponse => {
      this.serie = reponse;
    }, err => {
      console.log('error');
    });
    //console.log(this.serie);
  }

  show(i:number){
    if(this.daMostrare==i){
      this.daMostrare=null;
    }
    else{
      this.daMostrare=i;
    }
  }
  aggiungiPreferiti(id:number){
    console.log(this.serie);
    this.serie.forEach(element => {
      if(element.id===id){
        element.preferiti=true;
        this.myHttpService.putSerie(element).subscribe(()=>{
          this.myHttpService.getSerie().subscribe(reponse => {
            this.serie = reponse;
          }, err => {
            console.log('error');
          });
        });
        console.log(element);
      }
    });
  }

  rimuoviPreferiti(id:number){
    console.log(this.serie);
    this.serie.forEach(element => {
      if(element.id===id){
        element.preferiti=false;
        this.myHttpService.putSerie(element).subscribe(()=>{
          this.myHttpService.getSerie().subscribe(reponse => {
            this.serie = reponse;
          }, err => {
            console.log('error');
          });
        });
        console.log(element);
      }
    });
  }

}
