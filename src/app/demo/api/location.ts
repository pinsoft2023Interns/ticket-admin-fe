export interface District {
    area?: number;
    id?: number;
    name?: string;
    population?: number;
}

export interface Location {
    name: string;
    id: number;
    districts: District[];
}