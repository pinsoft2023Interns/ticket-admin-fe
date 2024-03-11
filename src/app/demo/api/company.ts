
export interface Station {
    name?: string,
    busNavigationId?: number,
}
export interface Ticket {
    seatInfo?: string,
    price?: number,
    userId?: number,
    busNavigationId?: number,
}

export interface BusNavigation {
    arrivalPlace?: string,
    departureDate?: string,
    departurePlace?: string,
    id?: number,
    stations?: Station[],
    ticket?: Ticket[],
}

export interface Company {
    driverName?: string,
    hostName?: string,
    id?: number,
    plate?: string,
    numberOfSeats?: number,
    busNavigation?: BusNavigation[]
}

