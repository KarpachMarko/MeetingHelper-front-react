export type GuestStatus = "May be Going" | "Going" | "Responsible"
export type RequirementRole = "User" | "Responsible"

export function getStatusName(index: number): GuestStatus {
    const statuses: {[key: number]: GuestStatus} = {0: "May be Going", 1: "Going", 2: "Responsible"};
    return statuses[index];
}

export function getRequirementRoleName(index: number): RequirementRole {
    const statuses: {[key: number]: RequirementRole} = {1: "User", 2: "Responsible"};
    return statuses[index];
}
