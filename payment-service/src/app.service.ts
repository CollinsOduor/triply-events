import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schema/payment.schema';

@Injectable()
export class AppService {
  /*
    Payments aare handled by Pesapal
  */
  API_URL = process.env.API_URL;
  PESAPAL_URL = process.env.PESAPAL_URL || 'https://demo.pesapal.com';
  PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
  PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;

  constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {}
  getHello(): string {
    return 'Hello World from Payments Service!';
  }



  async authentication() {
    // Get the auth token from Pesapal

    const got = await import('got');

    const { body } = await got.got.post(
      `${this.PESAPAL_URL}/api/Auth/RequestToken`, 
      {json: {
        consumer_key: this.PESAPAL_CONSUMER_KEY,
        consumer_secret: this.PESAPAL_CONSUMER_SECRET
      }
    })
    return body;
  }


  async submitPayment(data: Payment) {
    // Persist the payment details in the DB, and send a request to Pesapal
    const payload = {
      "event_id": data.event._id,
      "currency": "KES",
      "amount": data.event.price,
      "description": "Payment for event",
      "callback_url": `${this.API_URL}/payment-handler`,
      "redirect_mode": "",
      "notification_id": "fe078e53-78da-4a83-aa89-e7ded5c456e6",
      "branch": "NA",
      "billing_address": {
        "email_address": data.user?.email,
        "phone_number": data.user.phoneNumber,
        "country_code": "KE",
        "first_name": data.user.firstName,
        "middle_name": "",
        "last_name": data.user.lastName,
        "line_1": "Pesapal Limited",
        "line_2": "",
        "city": "",
        "state": "",
        "postal_code": "",
        "zip_code": ""
      }
    }

    const got = await import('got');

    const { body } = await got.got.post(
      `${this.PESAPAL_URL}/api/Transactions/SubmitOrderRequest`, 
      {json: payload}
    )

    // TODO: register a webhook (payment-handler) to listen for the payment status, and update the status of the event automatically
    return body;
  }
}
