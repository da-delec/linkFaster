import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {customerId} = await req.json()
    const priceId = process.env.PRICE_ID!
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{price: priceId, quantity: 1}],
            mode: 'subscription',
            customer: customerId,
            success_url: `${process.env.BETTER_AUTH_URL}/dashboard`,
            cancel_url: `${process.env.BETTER_AUTH_URL}/dashboard`,
        })
        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}