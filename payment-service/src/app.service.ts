import { Injectable } from '@nestjs/common';
import { Payment } from './schema/payment.schema';

@Injectable()
export class AppService {
  PESAPAL_URL = process.env.PESAPAL_URL || 'https://demo.pesapal.com';
  getHello(): string {
    return 'Hello World!';
  }

  async authentication() {

    const got = await import('got');

    const { body } = await got.got.post(
      `${this.PESAPAL_URL}/api/Auth/RequestToken`, 
      {json: {
        consumer_key: "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW", 
        consumer_secret: "osGQ364R49cXKeOYSpaOnT++rHs="
      }
    })
    return body;
  }


  async submitPayment(data: Payment) {
    const payload = {
      "id": data.event._id,
      "currency": "KES",
      "amount": data.event.price,
      "description": "Payment for event",
      "callback_url": "https://www.myapplication.com/response-page",
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

    // We can register a webhook to listen for the payment status
    return body;
  }
}
