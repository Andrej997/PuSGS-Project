import { AbstractFilterParam } from '../abstract-filter-param/abstract-filter-param';

export class NumberFilterParam extends AbstractFilterParam {

    value: number;

    constructor(name: string, value: number) {
        super(name);
        this.value = value;
    }

    getFilterParamValue() {
        return this.value;
    }

    getFilterParamName() {
        return this.name;
    }
    
}
