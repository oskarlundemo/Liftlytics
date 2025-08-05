



export class MuscleGroupObject {
    id: string;
    name: string;
    sets: number = 0;

    constructor(id: string, name: string, sets: number) {
        this.id = id;
        this.name = name;
        this.sets = sets
    }
}