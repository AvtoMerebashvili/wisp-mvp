import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './common/shared.module';
import { quizContent } from './quiz/data/content';
import {
  BehaviorSubject,
  filter,
  flatMap,
  map,
  mergeMap,
  of,
  take,
  tap,
} from 'rxjs';
import { QuizService } from './quiz/services/quiz.service';
import { Task } from './common/enum/task.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public tasks$ = this.quizService.tasks$;
  public currentRoute$ = this.tasks$.pipe(map((t) => t[0]));
  public showSpinner$ = this.tasks$.pipe(map((tasks) => tasks.length));

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.initNavigation();
    this.generateQuiz();
  }

  private generateQuiz = () => this.quizService.generateQuiz(quizContent);

  public onNext = () => this.navigate(true);

  public onPrev = () => this.navigate(false);

  private navigate = (next: boolean) =>
    this.tasks$
      .pipe(
        take(1),
        mergeMap((tasks) =>
          this.currentRoute$.pipe(
            take(1),
            map((task) => tasks.findIndex((t) => t.id == task.id)),
            map(
              (currentRouteIndex) => tasks[currentRouteIndex + (next ? 1 : -1)]
            ),
            filter((newTask) => Boolean(newTask) != false),
            tap((newTask) => this.router.navigate([newTask.route])),
            tap((newTask) => (this.currentRoute$ = of(newTask)))
          )
        )
      )
      .subscribe();

  private initNavigation = () =>
    this.tasks$
      .pipe(
        take(1),
        tap((routes) => this.router.navigate([routes[0].route]))
      )
      .subscribe();
}
