import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Disable Next.js body parsing for webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
    try {
        const sig = req.headers.get('stripe-signature');
        
        console.log('Webhook received:', {
            hasSignature: !!sig,
            signatureLength: sig?.length,
            webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'Present' : 'Missing',
            url: req.url,
            method: req.method
        });

        if (!sig) {
            console.error('No stripe-signature header found');
            return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
        }

        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            console.error('STRIPE_WEBHOOK_SECRET not configured');
            return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
        }

        const rawBody = await req.text();
        console.log('Body length:', rawBody.length);
    
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                rawBody,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
            console.log('Webhook signature verified successfully for event:', event.type);
        } catch (err: any) {
            console.error('Webhook signature verification failed:', {
                error: err.message,
                signature: sig?.substring(0, 50) + '...',
                bodyStart: rawBody.substring(0, 100)
            });
            return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
        }
    switch(event.type) {
        case 'customer.subscription.deleted':
         try {
            const subscription = event.data.object;
            const customerId = subscription.customer;

            console.log('Processing customer.subscription.deleted:', {
                subscriptionId: subscription.id,
                customerId: customerId
            });

            if (customerId) {
                await prisma.user.update({
                    where: { stripeCustomerId: customerId as string },
                    data: { isPremium: false }
                });
            }
         } catch (error) {
            console.error('Error processing customer.subscription.deleted:', error);
            return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
         }
         break;
        case 'checkout.session.completed':
            try {
                const session = event.data.object;
                const customerId = session.customer;
                
                console.log('Processing checkout.session.completed:', {
                    sessionId: session.id,
                    customerId: customerId,
                    mode: session.mode
                });

                if (session.mode === 'subscription' && customerId) {
                    // Mettre à jour l'utilisateur pour le marquer comme premium
                    const updatedUser = await prisma.user.update({
                        where: {
                            stripeCustomerId: customerId as string
                        },
                        data: {
                            isPremium: true,
                            enableReviews: true
                        }
                    });

                    console.log('User updated to premium:', {
                        userId: updatedUser.id,
                        email: updatedUser.email,
                        isPremium: updatedUser.isPremium
                    });
                }
            } catch (error) {
                console.error('Error processing checkout.session.completed:', error);
                return NextResponse.json({ 
                    error: 'Error processing webhook' 
                }, { status: 500 });
            }
            break;
            
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Webhook processing error:', {
            error: error.message,
            stack: error.stack
        });
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}