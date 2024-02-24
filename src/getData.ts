import axios from "axios"
import dayjs from "dayjs"
import { ExchangeRates } from "./interfaces/ExhangeRates"

export const getTodayData = async () => {
    return (await axios.get(`https://yossthedev.me/kubacash-service/data/${dayjs().format("YYYY-MM-DD")}/informal.json`)).data as ExchangeRates
}

export const getYesterdayData = async () => {
    return (await axios.get(`https://yossthedev.me/kubacash-service/data/${dayjs().subtract(1, "day").format("YYYY-MM-DD")}/informal.json`)).data as ExchangeRates
}