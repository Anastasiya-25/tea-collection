import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeaType} from "../../../types/tea-type";
import {TeaService} from "../../core/tea.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'tea-collection',
  templateUrl: './tea-collection.component.html',
  styleUrls: ['./tea-collection.component.scss']
})
export class TeaCollectionComponent implements OnInit, OnDestroy {
  public tea: TeaType[] = [];
  public searchQuery: string = '';
  private routeSubscription: Subscription | null = null;

  constructor(private teaService: TeaService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.teaService.getAllTea()
      .subscribe((data) => {
        this.tea = data;
      });

    this.routeSubscription = this.activatedRoute.queryParams
      .subscribe(params => {
        this.searchQuery = params['search']?.trim() || '';
        this.loadTea(this.searchQuery);
      });
  }

  public loadTea(searchParam: string): void {
    this.teaService.getTea(searchParam)
      .subscribe({
        next: (data) => {
          this.tea = data;
        },
        error: (err) => {
          console.error('Ошибка при получении чая:', err);
          this.tea = [];
        }
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
