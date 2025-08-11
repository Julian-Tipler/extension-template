export function centsToDollars(cents: number, includeCents: boolean = false): string {
    if (includeCents) {
        return (cents / 100).toFixed(2);
    }
    return (cents / 100).toFixed(0);
}