import { Operator } from "./operator";

export interface Station {
    name: string;
    city: string;
    country: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
    code: string;
    operator: Operator | string;
}

