import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost',
      show: false,
      browser: 'chromium',
      waitForTimeout: 60_000,
      userAgent: `Chrome-${Date.now().toString()}`
    },
    MailinatorHelper: {
      require: '../dist/MailinatorHelper.js',
      token: process.env['MAILINATOR_TOKEN'],
      domain: process.env['MAILINATOR_DOMAIN']
    },
    ExpectHelper: {
      require: 'codeceptjs-expect'
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'test'
}
