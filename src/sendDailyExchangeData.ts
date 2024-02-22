import dayjs from "dayjs";
import { getEmojiForCurrency } from "./utils";
import axios from "axios";
require('dotenv').config();

const sendMessage = async () => {
    /* Send Formal Exchange Rate */
    sendExchangeData((await axios.get("https://exchange-rate.decubba.com/api/v2/formal/target/cup.json")).data, true);

    /* Send Informal Exchange Rate */
    sendExchangeData((await axios.get("https://exchange-rate.decubba.com/api/v2/informal/target/cup.json")).data, false);
}


const sendExchangeData = async (data: any, formal?: boolean) => {
    const { rates } = data;

    const markdown = `
*💱 Tasas De Cambio ${formal ? "Formal (Cadeca)" : "Informal"}*
📅 ${dayjs().format('DD/MM/YYYY')}

${Object.entries(rates).filter(([currency, rate]) => currency !== "CUP").map(([currency, rate]) =>
        `- ${getEmojiForCurrency(currency)} *${currency}*:
  - *Compra*: 🛒 $${(rate as any).buy} CUP 
  - *Venta*: 💸 $${(rate as any).sell} CUP`
    ).join('\n')}

🔔 Suscríbete a @kubacash para obtener información diaria de las tasas de cambio 💱
`
    const message =
    {
        chat_id: process.env.CHAT_ID,
        caption: markdown,
        parse_mode: 'Markdown',
        photo: "https://yossthedev.me/kubacash-data/exchange_rate.png",
    }


    const telegramUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`

    axios.post(telegramUrl, message)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}

sendMessage();

