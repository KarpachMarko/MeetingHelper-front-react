export function getTransferTypeName(index: number): string {
    const types: {[key: number]: string} = {0: "Cash", 1: "Transfer"};
    return types[index];
}
