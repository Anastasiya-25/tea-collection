import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";
import {TeaType} from "../../types/tea-type";

@Injectable()
export class TeaService {
  private searchSubject = new Subject<string>();
  public search$ = this.searchSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  getAllTea(): Observable<TeaType[]> {
    return this.http.get<TeaType[]>("https://testologia.ru/tea");
  }

  getOneTea(id: number): Observable<TeaType | undefined> {
    return this.getAllTea()
      .pipe(
        map((tea: TeaType[]) => {
          return tea.find(item => item.id === id);
        })
      );
  }

  createOrder(data: {name: string,
    last_name: string,
    phone: string,
    country: string,
    zip: string,
    product: string,
    address: string,
    comment: string,
  }) {
    return this.http.post<{success: boolean, message?: string}>("https://testologia.ru/order-tea", data);
  }

  public setSearchValue(value: string): void {
    this.searchSubject
      .next(value);
  }

  public getTea(searchParam?: string): Observable<TeaType[]> {
    const url = 'https://testologia.ru/tea';
    const options = searchParam ? { params: { search: searchParam } } : {};

    return this.http.get<TeaType[]>(url, options);
  }
}
