import {Component, OnInit} from '@angular/core';
import {TeaType} from "../../types/tea-type";
import {HttpClient} from "@angular/common/http";
import {TeaService} from "../../services/tea.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'tea',
  templateUrl: './tea.component.html',
  styleUrls: ['./tea.component.scss']
})
export class TeaComponent implements OnInit {
  public tea: TeaType | null = null;
  public id: number = 0;

  constructor(private teaService: TeaService, private http: HttpClient, private route: ActivatedRoute) {
    this.tea = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.teaService.getOneTea(id)
          .subscribe({
            next: (data: TeaType | undefined) => {
              if (data) {
                this.tea = data;
                console.log(this.tea);
              }
            },
            error: (err) => {
              console.error('Ошибка при загрузке чая:', err);
            }
          });
      }
    });
  }
}
