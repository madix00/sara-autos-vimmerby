import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { carService } from "../service/carService";

interface sendEmailClientProps {
	to: string;
	subject: string;
	text: string;
	html: string;
}

interface sendEmailOwnerProps {
	subject: string;
	text: string;
	html: string;
}
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: 587,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_KEY,
	},
});

export async function sendConfirmationToClient({
	to,
	subject,
	text,
	html,
}: sendEmailClientProps) {
	let mailOptions = {
		from: "Soupscriber Solutions <hello@soupscriber.com>", // sender address
		to: to, // list of receivers
		subject: subject, // Subject line
		text: text, // plain text body
		html: html, // HTML body content
	};

	try {
		let info = await transporter.sendMail(mailOptions);
		return info;
	} catch (error) {
		NextResponse.error();
		NextResponse.json({ error: error }, { status: 500 });
		console.error("Error sending email: ", error);
		throw error;
	}
}

export async function sendConfirmationToOwner({
	subject,
	text,
	html,
}: sendEmailOwnerProps) {
	let mailOptions = {
		from: "Soupscriber Solutions <hello@soupscriber.com>", // sender address
		to: "hello@soupscriber.com, branstark2108@gmail.com", // list of receivers
		subject: subject, // Subject line
		text: text, // plain text body
		html: html, // HTML body content
	};

	try {
		let info = await transporter.sendMail(mailOptions);
		return info;
	} catch (error) {
		NextResponse.error();
		NextResponse.json({ error: error }, { status: 500 });
		console.error("Error sending email: ", error);
		throw error;
	}
}
