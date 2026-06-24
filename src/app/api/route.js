import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// To handle a GET request to /api
export async function GET(request) {
  return NextResponse.json(
    { message: "Hello Congo, API is Live 🎉" },
    { status: 200 }
  );
}

// To handle a POST request to /api
export async function POST(request, response) {
  const { htmlContent, textContent, recipientEmail, subject } =
    await request.json();

  console.log("SMTP user:", process.env.SMTP_USER);

  const transporter = nodemailer.createTransport({
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    //secure: true,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    //tls: { ciphers: "SSLv3" },
  });

  let processed = false;

  await transporter
    .sendMail({
      html: htmlContent,
      from: process.env.SMTP_USER,
      to: recipientEmail,
      text: textContent,
      subject,
    })
    .then(() => {
      processed = true;
    })
    .catch((error) => {
      console.error("an error has occured when sending email", error);
    });

  if (processed) {
    return NextResponse.json(
      {
        status: "success",
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        status: "failed",
      },
      { status: 400 }
    );
  }
}