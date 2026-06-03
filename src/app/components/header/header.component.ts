import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchControl = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(): void {
    const value = this.searchControl.value?.trim() || '';

    this.router.navigate(['/tea-collection'], { queryParams: { search: value } });
  }

  onClear(event: Event): void {
    if (this.searchControl.value === '') {
      this.router.navigate(['/tea-collection']);
    }
  }

}
