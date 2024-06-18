
export interface Voyage {
    departurePlace?: { name: string, id: number },
    arrivalPlace?: { name: string, id: number },
    departureDate?: string,
    travelTime?: number,
    busId?: { id: number },
    busNavigation?: { id: number },
    price?: number,
}

