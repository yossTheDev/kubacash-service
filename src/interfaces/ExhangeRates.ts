import { Rate } from "./Rate";

export interface ExchangeRates {
    currency: string;
    exchangeDirection: 'source' | 'target';
    datetime: Date;

    rates: Record<string, Rate>;
}