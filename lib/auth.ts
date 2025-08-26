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
        from: "noreply@linkfaster.link",
        to: email,
        subject: "Magic Link",
        html: `<p>Click <a href="${url}">here</a> to login</p>`,
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







