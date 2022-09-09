const KNUT_API_KEY = process.env["KNUT_API_KEY"];

const baseUrl = "https://u0mlpnawb6.execute-api.us-west-2.amazonaws.com/dev/knuts/api";


function createRedemptionUrl(code, email) {
  return `${baseUrl}/GiftCard/Redeem?giftCardCode=${code}&recipientEmail=${email}`;
}

async function redeem(code, email) {
  const url = createRedemptionUrl(code, email);
  console.info({ msg: "redemption url", url });
  const response = await fetch(url,
    {
      method: "POST",
      headers: {
        "X-Api-Key": KNUT_API_KEY 
      }
    });
  const data = await response.json();
  console.info({ msg: "redemption response", data, raw: { response }});
  return data;
}

export default async function handler(req, res) {
  const { cookies, headers, query, body } = req;

  const data = await redeem("<redacted>", "<redacted>");

  res.status(200).json({ cookies, requestHeaders: headers, query, body, data });
}
