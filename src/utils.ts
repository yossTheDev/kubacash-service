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
        case 'CAD':
            return '🇨🇦';
        case 'CHF':
            return '🇨🇭';
        case 'GBP':
            return '🇬🇧';
        case 'JPY':
            return '🇯🇵';
        case 'MXN':
            return '🇲🇽';
        default:
            return ''
    }
}