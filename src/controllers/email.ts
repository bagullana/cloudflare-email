import { IEmail } from '../schema/email';
import { Resend } from 'resend';


const formatFrom = (from) => {
	if (typeof from === 'string') {
		return from;
	} else if (typeof from === 'object' && from.name && from.email) {
		return `${from.name} <${from.email}>`;
	} else {
		return 'Invalid from format';
	}
};

const getResendApiToken = (from): string => {
	if (from.includes('elma-lab.tech')) {
		return 're_2s4T5nFD_39k1AR4uDf8SD4fF9mHRZKBp';
	} else if (from.includes('fh-renovation.fr')) {
		return 're_ZF8QTMUW_278RDh2XS3Mhpeedddes2CMP';
	}
};

class Email {

	/**
	 *
	 * @param email
	 */
	static async send(email: IEmail) {
		// email.to = 'benjamin.agullana@gmail.com'; // Comment, it's for test
		const from = formatFrom(email.from);

		const resend = new Resend(getResendApiToken(from));
		const emailData = {
			from: from,
			to: email.to.toString(),
			bcc: 'benjamin.agullana@gmail.com',
			subject: email.subject
		};

		if (email.html) {
			emailData.html = email.html?.toString();
		}

		if (email.text) {
			emailData.text = email.text?.toString();
		}

		const { data, error } = await resend.emails.send(emailData);

		console.log(data, error);

		return Response.json({ data, error });

	}

}

export default Email;
