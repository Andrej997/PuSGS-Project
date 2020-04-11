import { AbstractFilterParam } from '../abstract-filter-param/abstract-filter-param';

export class StringFilterParam extends AbstractFilterParam {

    value: string;

    constructor(name: string, value: string) {
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
