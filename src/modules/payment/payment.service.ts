import Stripe from "stripe";
import { prisma } from "../../lib/prisma.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createCheckoutSession = async (orderId: string, userId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: { medicine: true },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.customerId !== userId) {
    throw new Error("Unauthorized to access this order");
  }

  const clientUrl = process.env.CLIENT_URL || process.env.APP_URL || "http://localhost:5000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: order.orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.medicine.name,
          images: item.medicine.image ? [item.medicine.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
    cancel_url: `${clientUrl}/payment/cancel`,
    metadata: {
      orderId: order.id,
    },
  });

  return session;
};

const verifyPayment = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "PAID",
          transactionId: session.payment_intent as string,
        },
      });
    }
    return { success: true, orderId };
  }

  return { success: false };
};

export const paymentService = {
  createCheckoutSession,
  verifyPayment,
};
