export interface Ticket {
    id?: number;
}

export interface BusNavStation {
    id?: number;
    stationOrder?: number;
    arrivalDate?: string;
    departureDate?: string;
    routeIdentifier?: string;
}

export interface BusNavigation {
    id?: number;
    tickets?: Ticket[];
    busNavStation?: BusNavStation[];
}

export interface Company {
    driverName?: string;
    hostName?: string;
    id?: number;
    plate?: string;
    numberOfSeats?: number;
    busNavigation?: BusNavigation[];
    busDesign?: string;
}


export interface Authority {
    authority?: string;
}

export interface User {
    id?: number;
    username?: string;
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    phone?: string;
    birthDate?: string;
    identificationNumber?: string;
    score?: number;
    gender?: string;
    role?: string;
    coupons?: any[];
    tickets?: Ticket[];
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    accountNonLocked?: boolean;
    authorities?: Authority[];
    enabled?: boolean;
}
