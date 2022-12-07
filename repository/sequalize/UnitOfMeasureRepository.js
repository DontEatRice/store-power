import UnitOfMeasure from "../../model/sequalize/UnitOfMeasure.js";
import DbRepository from "./DbRepository.js";

class UnitOfMeasureRepository extends DbRepository {
    constructor() {
        super(UnitOfMeasure)
    }
}

export default new UnitOfMeasureRepository()