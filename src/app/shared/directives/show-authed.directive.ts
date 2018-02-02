import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { UserService } from '../services/user.service';

@Directive({ selector: '[myclcShowAuthed]' }) // Custom NgIf based on UserService.isAuthenticated check
export class ShowAuthedDirective implements OnInit {
  public condition: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.userService.checkIsAuthenticated()
    .subscribe(
      isAuthenticated => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  @Input() set myclcShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
