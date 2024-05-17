
export interface Voyage {
    departurePlace?: { name: string, id: number },
    arrivalPlace?: { name: string },
    departureDate?: string,
    travelTime?: number,
    busId?: { id: number }
}

