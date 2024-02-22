import dayjs from "dayjs";
import { getEmojiForCurrency } from "./utils";
import axios from "axios";
require('dotenv').config();

const sendDailyExchangeData = async () => {
    const url = 'https://exchange-rate.decubba.com/api/v2/informal/target/cup.json'
    const response = await fetch(url)
    const data = await response.json();
    const { rates } = data;

    const markdown = `
*💱 Tasas De Cambio*
📅 ${dayjs().format('DD/MM/YYYY')}

${Object.entries(rates).filter(([currency, rate]) => currency !== "CUP").map(([currency, rate]) =>
        `- ${getEmojiForCurrency(currency)} *${currency}*:
  - *Compra*: 🛒 $${(rate as any).buy} cup 
  - *Venta*: 💸 $${(rate as any).sell} cup`
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

sendDailyExchangeData();

