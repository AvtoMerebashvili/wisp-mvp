import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject, filter, map, mergeMap, of, take, tap } from 'rxjs';
import { SharedModule } from './common/shared.module';
import { quizContent } from './quiz/data/content';
import { QuizService } from './quiz/services/quiz.service';
import { ITask } from './quiz/common/interface/generate-quiz.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './common/components/snackbar/snackbar.component';

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
    private quizService: QuizService<any>,
    private router: Router,
    private matSnackbar: MatSnackBar
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
            filter((currentIdx) =>
              next ? tasks[tasks.length - 1].id != tasks[currentIdx].id : true
            ),
            filter((currentIdx) =>
              this.handleNavigationNext(next, tasks, currentIdx)
            ),
            map((currentIdx) => tasks[currentIdx + (next ? 1 : -1)]),
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

  private handleNavigationNext(
    next: boolean,
    tasks: ITask[],
    currentIdx: number
  ) {
    if (!next) return true;
    const answered = this.quizService.existsInStore(tasks[currentIdx].id);
    if (answered) {
      return true;
    }
    this.matSnackbar.openFromComponent(SnackbarComponent, {
      data: 'შეიყვანეთ პასუხი',
      duration: 2000,
    });
    return false;
  }
}
