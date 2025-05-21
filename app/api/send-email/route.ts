import { NextRequest, NextResponse } from "next/server";

// Đặt token & chatId vào .env cho bảo mật
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    const now = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    const text = `
    🔔 <b>NEW CONTACT FROM PORTFOLIO</b>
    
    👤 <b>Name:</b> ${name}
    📧 <b>Email:</b> ${email}
    💬 <b>Message:</b>
    ${message}
    🕒 <b>Time:</b> ${now}
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send Telegram message");
    }

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
