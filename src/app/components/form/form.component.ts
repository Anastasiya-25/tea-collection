import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeaService} from "../../services/tea.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  public isSuccess: boolean = false;
  public isError: boolean = false;
  // formValues = {
  //   name: '',
  //   last_name: '',
  //   phone: '',
  //   country: '',
  //   zip: '',
  //   product: '',
  //   address: '',
  //   comment: ''
  // }
  formValues = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яёЁ]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яёЁ]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    address: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яёЁ0-9\\s\\-\\/]+$')]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    product: ['', Validators.required],
    comment: [''],
  });


  constructor(private teaService: TeaService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
  }

  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['tea']) {
        console.log(params);
        this.formValues.patchValue({
          product: params['tea']
        });
      }
    });
  }

  createOrder(): void {
    if (this.formValues.invalid) {
      this.formValues.markAllAsTouched();
      return;
    }

    this.isError = false;

    const rawData = this.formValues.getRawValue();
    const orderData = {
      name: rawData.name || '',
      last_name: rawData.last_name || '',
      phone: rawData.phone || '',
      country: rawData.country || '',
      zip: rawData.zip || '',
      product: rawData.product || '',
      address: rawData.address || '',
      comment: rawData.comment || '',
    };

    this.teaService.createOrder(orderData)
      .subscribe({
        next: (res) => {
          if (res && res.success) {
            console.log('Успешный ответ сервера:', res);
            this.isSuccess = true;
            this.formValues.reset();

          } else {
            this.isError = true;
          }
        },
        error: (err) => {
          this.isError = true;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
