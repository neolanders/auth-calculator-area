import { ShowAuthedDirective } from './show-authed.directive';

import {
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

describe('ShowAuthedDirective', () => {
  it('should create an instance', () => {
    const directive = new ShowAuthedDirective(undefined, undefined, undefined);
    expect(directive)
    .toBeTruthy();
  });
});
