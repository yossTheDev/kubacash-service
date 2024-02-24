import axios from "axios"
import dayjs from "dayjs"

export const getTodayData = async () => {
    return (await axios.get(`https://yossthedev.me/kubacash-service/data/${dayjs().format("YYYY-MM-DD")}/informal.json`)).data
}