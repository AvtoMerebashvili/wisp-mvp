import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject, filter, map, mergeMap, of, take, tap } from 'rxjs';
import { SharedModule } from './common/shared.module';
import { quizContent } from './quiz/data/content';
import { QuizService } from './quiz/services/quiz.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public tasks$ = this.quizService.tasks$;
  public lives$ = this.quizService.lives$;
  public currentRoute$ = this.tasks$.pipe(map((t) => t[0]));
  public showSpinner$ = this.tasks$.pipe(map((tasks) => tasks.length));
  public progess$ = new BehaviorSubject(0);

  constructor(
    private quizService: QuizService<unknown>,
    private router: Router
  ) {}

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
            map((currentTaskIdx) => tasks[currentTaskIdx + (next ? 1 : -1)]),
            filter((newTask) => Boolean(newTask) != false),
            tap((newTask) =>
              this.router.navigate([newTask.route + `/${newTask.id}`])
            ),
            tap((newTask) => (this.currentRoute$ = of(newTask))),
            map((newTask) => tasks.findIndex((t) => t.id == newTask.id)),
            tap((newTaskIdx) =>
              this.progess$.next(
                (newTaskIdx / tasks.length) * 100 + tasks.length
              )
            )
          )
        )
      )
      .subscribe();

  private initNavigation = () =>
    this.tasks$
      .pipe(
        take(1),
        tap((routes) =>
          this.router.navigate([routes[0].route + `/${routes[0].id}`])
        )
      )
      .subscribe();
}
