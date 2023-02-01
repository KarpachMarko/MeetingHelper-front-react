export function getRoleName(index: number): string {
    const roles: {[key: number]: string} = {1: "Creator", 2: "Manager", 3: "Guest"};
    return roles[index];
}
