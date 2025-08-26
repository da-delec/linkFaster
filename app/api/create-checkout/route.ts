import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {customerId, period} = await req.json()
   
    if (!customerId) {
        return NextResponse.json({error: 'Customer ID is required'}, {status: 400})
    }

    const monthlyPriceId = process.env.PRICE_ID!
    const annualPriceId = process.env.PRICE_ID_ANNUALY!
    
    const priceId = period === 'yearly' ? annualPriceId : monthlyPriceId
   
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