import { db } from "@/db";
import { donations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.redirect(new URL("/donation?payment=failed", req.url));
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    const transaction = response.data.data;

    if (transaction.status !== "success") {
      return NextResponse.redirect(new URL("/donation?payment=failed", req.url));
    }

    const { name, email, amount, frequency, fund } = transaction.metadata;

    // Check for duplicate
    const existing = await db
      .select()
      .from(donations)
      .where(eq(donations.paystackReference, reference))
      .then((r) => r[0]);

    if (!existing) {
      await db.insert(donations).values({
        name: name ?? "Anonymous",
        email,
        amount,
        frequency: frequency ?? "one-time",
        fund: fund ?? "General Fund",
        paystackReference: reference,
      });
    }

    return NextResponse.redirect(new URL("/donation?payment=success", req.url));
  } catch (error) {
    console.error("Donation verify error:", error);
    return NextResponse.redirect(new URL("/donation?payment=failed", req.url));
  }
}