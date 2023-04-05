[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/peternguyew)

# codeceptjs-MailinatorHelper-helper

CodeceptJS MailinatorHelper helper.

NPM package: <https://www.npmjs.com/package/codeceptjs-mailinator-helper>

## Installation

`npm i codeceptjs-mailinator-helper --save-dev`

## Configuration

This helper should be added in your codeceptjs config file: `codecept.conf.*`

Example:

```
{
...
   helpers: {
     MailinatorHelper: {
      require: 'codeceptjs-mailinator-helper',
      token: 'your mailinator token',
      domain: 'your mailinator domain',
      debug: true // false by default
    }
   }
...
}
```

## Usage
- If there is no auto complete for `I` actor, try running `npx codeceptjs def`

```
Feature('Newsletter');

Scenario('Subscription Email',  async ({ I }) => {
    const emailAddress = `${Date.now().toString()}@xxxx.testinator.com`
    I.amOnPage('https://de.statista.com/newsletter/subscription')
    I.click('#onetrust-accept-btn-handler')
    I.fillField('#newsletterSubscription_email', emailAddress)
    I.click('#newsletterSubscription_changeInfographicNewsletter')
    I.waitForText('Überprüfen Sie bitte Ihren Posteingang')
    I.wait(5)
    const email = await I.getMessageContent(emailAddress)
    I.expectContain(email, 'https://de.statista.com/newsletter/subscription-check/')
});
```

Output

```
Newsletter --
    [1]  Starting recording promises
    Timeouts: 
 › [Session] Starting singleton browser session
  Subscription Email
    I am on page "https://de.statista.com/newsletter/subscription"
    I click "#onetrust-accept-btn-handler"
    I fill field "#newsletterSubscription_email", "1680616147225@xxxx.testinator.com"
    I click "#newsletterSubscription_changeInfographicNewsletter"
    I wait for text "Überprüfen Sie bitte Ihren Posteingang"
    I wait 5
    I get message content "1680616147225@xxxx.testinator.com"
    I expect contain "<p>Sehr geehrter Kunde,</p>
<p>halten Sie sich auf dem Laufenden und sichern Sie sich unsere Newsletter.</p>
<p>Um Ihre Anmeldung zu best&auml;tigen, klicken Sie einfach den nachfolgenden Link: <a href="https://de.statista.com/newsletter/subscription-check/f2a441ea28f0e7447e">Anmeldung best&auml;tigen</a></p>
<p>Der Link ist 48 Stunden g&uuml;ltig - sollten Sie Ihre Anmeldung nicht innerhalb dieser Zeit aktivieren, werden wir Ihre Daten wieder aus unserem System l&ouml;schen.</p>
<p>Ihr Statista-Team</p>
<p style="font-size: 80%;">Aktivierungs-Link nicht klickbar? Kopieren Sie diesen Link in Ihren Browser:</p>
<p style="font-size: 80%; word-break: break-all;">https://de.statista.com/newsletter/subscription-check/038d906a441ea28f0e7447e</p>", "https://de.statista.com/newsletter/subscription-check/"
  ✔ OK in 8561ms


  OK  | 1 passed   // 10s

```
