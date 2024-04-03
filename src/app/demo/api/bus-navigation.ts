export interface BusNavigation {
    id: number;
    bus: Bus;
    tickets: Ticket[];
    busNavStation: BusNavStation[];
}

export interface Bus {
    id: number;
    plate: string;
    driverName: string;
    hostName: string;
    busDesign: string;
    numberOfSeats: number;
    companyId: Company;
    busNavigation: string[];
}

export interface Ticket {
    id: number;
    seatInfo: string;
    price: number;
    user: User;
    busNavigation: string;
    busNavStation: BusNavStation;
    canceled: boolean;
    active: boolean;
}

export interface BusNavStation {
    id: number;
    stationOrder: number;
    arrivalDate: Date;
    departureDate: Date;
    station: Station;
    busNavigation: string;
    tickets: string[];
}

export interface Company {
    id: number;
    name: string;
    buses: string[];
  }
  
  export interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    gender: string;
    role: string;
    coupons: Coupon[];
    tickets: string[];
    authorities: Authority[];
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    enabled: boolean;
  }
  
  export interface Coupon {
    id: number;
    amount: number;
    user: string;
  }
  
  export interface Authority {
    authority: string;
  }
  export interface Station {
    id: number;
    name: string;
    busNavStation: string[];
  }
  