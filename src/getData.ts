import axios from "axios"
import dayjs from "dayjs"
import { ExchangeType } from "./interfaces/CurrencyType"
import { ExchangeRates } from "./interfaces/ExhangeRates"

export const getTodayData = async (type: ExchangeType) => {
    return (await axios.get(`https://yossthedev.me/kubacash-service/data/${dayjs().format("YYYY-MM-DD")}/${type}.json`)).data as ExchangeRates
}

export const getYesterdayData = async (type: ExchangeType) => {
    return (await axios.get(`https://yossthedev.me/kubacash-service/data/${dayjs().subtract(1, "day").format("YYYY-MM-DD")}/${type}.json`)).data as ExchangeRates
}