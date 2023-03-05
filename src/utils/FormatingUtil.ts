export function getExpensePercent(totalSpent: number, budgetPerPerson: number): number {
    const percent = totalSpent / budgetPerPerson * 100;
    return percent > 100 ? 100 : percent;
}