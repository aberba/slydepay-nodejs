const Slydepay = require("../index");

const emailOrMobileNumber = "Account email or mobile number";
const merchantKey = "Account merchant key";

const merchant = new Slydepay({
    emailOrMobileNumber,
    merchantKey
});

// NOTE: refer to slydepay docs at http://doc.slydepay.com
// for parameters required for each method. 
// Make sure to read on the meaning of the various parameters.

(async () => {
    // See http://doc.slydepay.com/#api-Invoicing-ListPayOptions
    try {
        const payOptions = await merchant.listPayOptions();
        console.log("Slydepay payment options: ", payOptions)

        // NOTE: you don't need to add your emailOrMobileNumber and 
        // merchantKey to options since they are automatically injected 
        // using value passed when calling new Slydepay({...}) 
        const options = {
            amount: 123.4,
            // e.g an ID you use to keep track of transactions in your app
            orderCode: "your custom uniquely generated order/transaction ID"
        };

        // alternative options format (with orderItems)
        /*
        const options = {
            "emailOrMobileNumber": "merchant@awesomecustomer.com",
            "merchantKey": "thatkeyyoushouldkeepsecret",
            "amount": 100,
            "orderCode": "my-uniquely-generated-order-id",
            "orderItems": [
                {
                    "itemCode": "qwerty",
                    "itemName": "RFC",
                    "unitPrice": 20,
                    "quantity": 2,
                    "subTotal": 40
                },
                {
                    "itemCode": "qazxsw",
                    "itemName": "POC",
                    "unitPrice": 60,
                    "quantity": 1,
                    "subTotal": 60
                }
            ]
        }
        */

        const result = await merchant.createInvoice(options);
        console.log("API response: ", result)
        if (result.success) {
            // Invoice created successfully
            // See http://doc.slydepay.com/#api-Invoicing-CreateInvoice 
            // to see how a sample response looks like

        } else {
            // Failed due to some reason, check result.errorMessage and 
            // result.errorCode
            // See http://doc.slydepay.com/#api-Invoicing-CreateInvoice
            // for the various errors codes and their meaning to 
            // handle request accordingly 

            /** 
            e.g. response
            { 
                success: false,
                result: null,
                errorMessage: 'Invalid Merchant Key. Please use a valid merchant key',
                errorCode: 'INVALID_MERCHANT_KEY' 
            }
            */
        }

    } catch (error) {
        console.log("Error:", error)
    }
})()