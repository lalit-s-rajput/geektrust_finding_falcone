export interface Planets {
    name:string,
    distance:number
};

export interface Vehicle{
    name:string,
    total_no:number,
    max_distance:number,
    speed:number
}

export interface finalState {
    token:string;
    planet_names:string[];
    vehicle_names:string[];
}