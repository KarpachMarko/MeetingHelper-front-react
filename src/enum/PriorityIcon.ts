interface Icon {
    alt: string
    path: string
}

const icons: { [key: number]: Icon } = {
        [-4]: {
            alt: "Trivial",
            path: "/icons/Priorities/trivial.svg"
        },
        [-3]: {
            alt: "Minor",
            path: "/icons/Priorities/minor.svg"
        },
        [-2]: {
            alt: "Lowest",
            path: "/icons/Priorities/lowest.svg"
        },
        [-1]: {
            alt: "Low",
            path: "/icons/Priorities/low.svg"
        },
        0: {
            alt: "Medium",
            path: "/icons/Priorities/medium.svg"
        },
        1: {
            alt: "High",
            path: "/icons/Priorities/high.svg"
        },
        2: {
            alt: "Highest",
            path: "/icons/Priorities/highest.svg"
        },
        3: {
            alt: "Major",
            path: "/icons/Priorities/major.svg"
        },
        4: {
            alt: "Critical",
            path: "/icons/Priorities/critical.svg"
        },
        5: {
            alt: "Blocker",
            path: "/icons/Priorities/blocker.svg"
        }
    }

export function getAllPriorities(): number[] {
    return Array.from(Array(10).keys(), v => v - 4)
}

export function getPriorityIcon(priority: number): Icon {
    if (priority < -4) {
        return icons[-4];
    }
    if (priority > 5) {
        return icons[5];
    }
    return icons[priority];
}