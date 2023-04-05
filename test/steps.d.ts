/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type MailinatorHelper = import('../dist/MailinatorHelper.js');
type ExpectHelper = import('codeceptjs-expect');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Playwright, MailinatorHelper, ExpectHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<MailinatorHelper>, WithTranslation<ExpectHelper> {}
  namespace Translation {
    interface Actions {}
  }
}
