export function getStatusName(index: number): string {
    const statuses: {[key: number]: string} = {0: "May be Going", 1: "Going", 2: "Responsible"};
    return statuses[index];
}

export function getRequirementRoleName(index: number): string {
    const statuses: {[key: number]: string} = {1: "User", 2: "Responsible"};
    return statuses[index];
}
