import Teams from '../database/models/Teams';

export default class TeamsService {
  static async findAll() {
    const teams = await Teams.findAll();
    return teams;
  }
}
