export default class GenericRepository {
    constructor(dao,entity) {
        this.dao = dao;
        this.entity = entity;
    }
}