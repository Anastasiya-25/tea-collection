import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AnswersService} from "../../shared/services/answers.service";
import {AnswerType} from "../../../types/answer-type";
import {Subscription, timer} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TemplateElement} from "@angular/compiler-cli/src/ngtsc/translator";


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

  constructor(private answersService: AnswersService, private modalService: NgbModal) {
  }

  @ViewChild('modal')
  modal!: TemplateRef<TemplateElement>;

  ngOnInit(): void {
    this.answers = this.answersService.getAnswers();
  }
  ngAfterViewInit(): void {
    this.popupSubscription = timer(10000).subscribe(() => {
      if (this.modal) {
        this.modalService.open(this.modal, {});
      }
    });
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
