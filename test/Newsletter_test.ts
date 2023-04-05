Feature('Newsletter');

Scenario('Subscription Email',  async ({ I }) => {
    const emailAddress = `${Date.now().toString()}@${process.env['MAILINATOR_DOMAIN']}`
    I.amOnPage('https://www.thomann.de/newsletter.html')
    I.click('Geht klar')
    I.fillField('#email', secret(emailAddress))
    I.click('.newsletter-subscribe__form button[type="button"]')
    I.waitForInvisible('.newsletter-subscribe__form button[type="button"]')
    I.wait(5)
    const email = await I.getMessageContent(secret(emailAddress))
    I.expectContain(email, 'newsletter_confirmation.html?subscription_token')
});
