import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { name, email, amount, frequency, fund } = await req.json();

    if (!email || !amount || !fund) {
      return NextResponse.json({ error: "Email, amount and fund are required" }, { status: 400 });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount, // already in kobo
        currency: "NGN",
        reference: `glm_donation_${Date.now()}`,
        metadata: {
          name,
          email,
          amount,
          frequency,
          fund,
          type: "donation",
        },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/donations/verify`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      authorizationUrl: response.data.data.authorization_url,
      reference: response.data.data.reference,
    });
  } catch (error) {
    console.error("Donation initialize error:", error);
    return NextResponse.json({ error: "Failed to initialize donation" }, { status: 500 });
  }
}