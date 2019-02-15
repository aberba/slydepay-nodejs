const fetch = require("node-fetch");

async function fetchJSON(hostURL, options = {}) {
    return await fetch(hostURL, options)
        .then(res => {
            try {
                return res.json();
            } catch (error) {
                return Promise.reject(res);
            }
        });
};

class Slydepay {
    constructor(credentials) {
        this.emailOrMobileNumber = credentials.emailOrMobileNumber || "";
        this.merchantKey = credentials.merchantKey || "";
    }

    async listPayOptions() {
        return await this.sendRequest("https://app.slydepay.com.gh/api/merchant/invoice/payoptions", {
            emailOrMobileNumber: this.emailOrMobileNumber,
            merchantKey: this.merchantKey
        });
    }

    async createInvoice(options) {
        return await this.sendRequest("https://app.slydepay.com.gh/api/merchant/invoice/create", options);
    }

    async createAndSendInvoice(options) {
        return await this.createInvoice(Object.assign(options, { sendInvoice: true }));
    }

    async sendInvoice(options) {
        return await this.sendRequest("https://app.slydepay.com.gh/api/merchant/invoice/send", options);
    }

    async checkPaymentStatus(options) {
        return await this.sendRequest("https://app.slydepay.com.gh/api/merchant/invoice/checkstatus", options);
    }

    async confirmTransaction(options) {
        return await this.sendRequest("https://app.slydepay.com.gh/api/merchant/transaction/confirm", options);
    }

    async cancelTransaction(options) {
        return await this.sendRequest("https://app.slydepay.com.gh/api/merchant/transaction/confirm", options);
    }

    // Reusable request method
    async sendRequest(url, options = {}) {
        try {
            return await fetchJSON(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                // Inject Slydepay credentials here
                body: JSON.stringify(Object.assign(options, {
                    emailOrMobileNumber: this.emailOrMobileNumber,
                    merchantKey: this.merchantKey
                }))
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = Slydepay;