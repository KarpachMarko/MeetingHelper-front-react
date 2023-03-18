export type OptionStatus = "Rejected" | "Selected"

export function getStatusName(index: number): OptionStatus {
    const statuses: { [key: number]: OptionStatus } = {[-1]: "Rejected", 0: "Selected"};
    return statuses[index];
}