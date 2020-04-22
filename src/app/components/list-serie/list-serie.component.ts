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
  mostra: boolean;
  serie: Serie[] = [];
  serieFiltrata: Serie[];
  constructor(private myHttpService: MyHttpService, private serieService: SerieService) {
    this.mostra = false;
  }

  ngOnInit(): void {
    this.myHttpService.getSerie().subscribe(reponse => {
      this.serie = reponse;
      this.filtra(0);
    }, err => {
      console.log('error');
    });
    //console.log(this.serie);
  }

  show(i: number) {
    if (this.daMostrare == i) {
      this.daMostrare = null;
    }
    else {
      this.daMostrare = i;
    }
  }

  filtra(filtro: number) {
    this.serieFiltrata = this.serie.filter(item =>{
      switch(filtro){
        case 0: return !item.nascosto;
        case 1: return item.preferiti;
        case 2: return item.nascosto;
      }
    });
    // this.serieFiltrata = [];
    // switch (filtro) {
    //   case 0: {
    //     this.serie.forEach(item => {
    //       if (!item.nascosto) {
    //         this.serieFiltrata.push(item);
    //         console.log(item);
    //       }
    //     });
    //     break;
    //   }
    //   case 1: {
    //     this.serie.forEach(item => {
    //       if (item.preferiti) {
    //         this.serieFiltrata.push(item);
    //       }
    //     });
    //     break;
    //   }
    //   case 2: {
    //     this.serie.forEach(item => {
    //       if (item.nascosto) {
    //         this.serieFiltrata.push(item);
    //       }
    //     });
    //     break;
    //   }
    // }
    console.log(this.serieFiltrata);
  }

}
