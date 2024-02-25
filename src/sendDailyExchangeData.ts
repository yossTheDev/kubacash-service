import axios from "axios";
import dayjs from "dayjs";
import { getTodayData } from "./getData";
import { ExchangeType } from "./interfaces/CurrencyType";
import { ExchangeRates } from "./interfaces/ExhangeRates";
import { getEmojiForCurrency } from "./utils";
require('dotenv').config();

const sendMessage = async () => {
    /* Send Formal Exchange Rate */
    sendExchangeData(await getTodayData(ExchangeType.formal), ExchangeType.formal);

    /* Send Informal Exchange Rate */
    sendExchangeData(await getTodayData(ExchangeType.informal), ExchangeType.formal);
}


const sendExchangeData = async (data: ExchangeRates, type: ExchangeType) => {
    const { rates } = data;

    const markdown = `
*💱 Tasas De Cambio ${type === ExchangeType.formal ? "Formal (Cadeca)" : "Informal"}*
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

