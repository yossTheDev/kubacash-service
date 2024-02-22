export function getEmojiForCurrency(currency: string) {
    switch (currency) {
        case 'USD':
            return '🇺🇸'
        case 'MLC':
            return '🇨🇺'
        case 'CUP':
            return '🇨🇺'
        case 'EUR':
            return '🇪🇺'
        default:
            return ''
    }
}