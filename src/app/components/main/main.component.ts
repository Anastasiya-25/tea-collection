import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AnswersService} from "../../services/answers.service";
import {AnswerType} from "../../types/answer-type";
import {Subscription, timer} from "rxjs";

declare var bootstrap: any;

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AnswersService]
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  openIndex: number | null = 0;
  public answers: AnswerType[] = [];
  private popupSubscription: Subscription | null = null;

  constructor(private answersService: AnswersService) {
  }

  ngOnInit(): void {
    this.answers = this.answersService.getAnswers();
  }
  ngAfterViewInit(): void {
    const modalElement = document.getElementById('welcomeModal');

    if (modalElement) {
      // Создаем Observable, который сработает один раз через 10000 миллисекунд (10 секунд)
      this.popupSubscription = timer(10000).subscribe(() => {
        const welcomeModal = new bootstrap.Modal(modalElement);
        welcomeModal.show();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }

  toggleAccordion(index: number): void {
    if (this.openIndex === index) {
      this.openIndex = null;
    } else {
      this.openIndex = index;
    }
  }

}
