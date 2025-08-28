import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { stripe } from "./stripe";
import {Resend} from "resend";
import {magicLink} from "better-auth/plugins/magic-link";
import { customSession } from "better-auth/plugins";
import { profile } from "console";
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider:"postgresql"
  }),
  databaseHooks: {
    user: {
        create: {
            after: async (user) => {
                try {
                    // Vérifier si l'utilisateur a déjà un stripeCustomerId
                    const existingUser = await prisma.user.findUnique({
                        where: { id: user.id },
                        select: { stripeCustomerId: true }
                    });

                    // Si l'utilisateur a déjà un stripeCustomerId valide, ne rien faire
                    if (existingUser?.stripeCustomerId && 
                        existingUser.stripeCustomerId !== "cus_000000000000000000000000") {
                        console.log(`User ${user.email} already has Stripe customer: ${existingUser.stripeCustomerId}`);
                        return;
                    }

                    // Créer le client Stripe
                    const stripeCustomer = await stripe.customers.create({
                        email: user.email,
                        name: user.name,
                        metadata: {
                            userId: user.id,
                            signupMethod: 'email' // ou 'social' selon le contexte
                        }
                    });

                    console.log(`Created Stripe customer for ${user.email}: ${stripeCustomer.id}`);

                    // Mettre à jour l'utilisateur avec le stripeCustomerId
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { 
                            stripeCustomerId: stripeCustomer.id 
                        },
                    });

                    console.log(`Updated user ${user.email} with Stripe customer ID: ${stripeCustomer.id}`);

                } catch (error) {
                    console.error(`Error creating Stripe customer for ${user.email}:`, error);
                    
                    // En cas d'erreur, on met quand même à jour avec l'ID par défaut
                    // pour éviter les erreurs dans le webhook
                    try {
                        await prisma.user.update({
                            where: { id: user.id },
                            data: { 
                                stripeCustomerId: "cus_000000000000000000000000" 
                            },
                        });
                        console.log(`Set default Stripe customer ID for ${user.email} due to error`);
                    } catch (updateError) {
                        console.error(`Error updating user ${user.email} with default Stripe ID:`, updateError);
                    }
                }
            },
        },
    },
},
plugins: [
  customSession(async ({ user, session }) => {
    const role = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })
    return {
        user: {
            ...user,
           stripeCustomerId:role?.stripeCustomerId
         
        }
    }
}),

  magicLink({
    sendMagicLink: async ({ email, url }) => {
      await resend.emails.send({
        from: "magiclink@linkfaster.link",
        to: email,
        subject: "🔗 Your secure login link",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>linkfaster Login</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">linkfaster</h1>
              <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Your creative management platform</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="background-color: #f1f5f9; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">🔐</span>
                </div>
                <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">Secure Login</h2>
                <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.5;">
                  Click the button below to securely log in to your linkfaster account.
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.35); transition: all 0.3s ease;">
                  Log in to linkfaster
                </a>
              </div>
              
              <!-- Security Info -->
              <div style="background-color: #f8fafc; border-left: 4px solid #22c55e; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="color: #166534; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                  🛡️ Enhanced Security
                </h3>
                <p style="color: #365314; margin: 0; font-size: 14px; line-height: 1.4;">
                  This link is unique and secure. It will automatically expire after use or in 10 minutes for your protection.
                </p>
              </div>
              
              <!-- Alternative Link -->
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #64748b; font-size: 14px; margin-bottom: 10px;">
                  Button not working? Copy and paste this link into your browser:
                </p>
                <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; word-break: break-all;">
                  <code style="color: #475569; font-size: 12px;">${url}</code>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 30px 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">
                You're receiving this email because a login was requested for <strong>${email}</strong>
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                If you didn't request this login, you can safely ignore this email.
              </p>
              <div style="margin-top: 20px;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                  © 2024 linkfaster. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
        `,
      });
    },
  }),

 
],

  emailAndPassword:{
    enabled:false,
  },
  socialProviders:{
    github:{
      clientId:process.env.GITHUB_CLIENT_ID as string,
      clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
    
    },
    google:{
      clientId:process.env.GOOGLE_CLIENT_ID as string,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
    },
   
   
  },
  
  
});







