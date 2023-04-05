import { Helper } from "codeceptjs";
import { GetInboxRequest, GetMessageRequest, MailinatorClient } from "mailinator-client";
import Secret = CodeceptJS.Secret;

interface MailinatorConfig {
	require: string;
	token: string;
	domain: string;
	debug?: boolean;
}

type emailAddress = string | Secret

class MailnatorHelper extends Helper {
	private readonly mailinatorClient;
	private config;
	constructor(config: MailinatorConfig) {
		super(config);
		if (!(config.token || config.domain)) throw Error("Please provide a valid token/domain");
		this.mailinatorClient = new MailinatorClient(config.token);
		this.config = config;
	}

	/**
	 * Get the inbox data
	 */
	getInbox() {
		if (this.config.debug) console.log(`Mailinator Client: ${this.mailinatorClient}`)
		return this.mailinatorClient.request(new GetInboxRequest(this.config.domain));
	}

	/**
	 * Retrieve messages from a given email address
	 * @param email
	 */
	async getMessages(email: emailAddress) {
		const res = await this.getInbox();
		if (this.config.debug) console.log(`Response: ${res}`)
		if (!res.result) return;
		return res.result.msgs.filter((item) => email.toString().includes(item.to));
	}

	/**
	 * Retrieve content of emails from a given email address
	 * @param email
	 */
	async getMessageContent(email: emailAddress) {
		const messages = await this.getMessages(email.toString());
		if (!messages) return;
		if (this.config.debug) console.log(`Messages: ${messages}`)
		const contents = [];

		for (const message of messages) {
			const messageId = message.id;
			const inboxName = message.to;
			const response = await this.mailinatorClient.request(
				new GetMessageRequest(this.config.domain, inboxName, messageId),
			);
			if (!response.result) continue;
			contents.push(response.result.parts[0].body);
		}
		if (this.config.debug) console.log(`Contents: ${contents}`)
		return contents.length > 1 ? contents : contents[0];
	}
}

export = MailnatorHelper;
