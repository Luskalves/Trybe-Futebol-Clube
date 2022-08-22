import Teams from '../database/models/Teams';

export default class TeamsService {
  static async findAll() {
    const teams = await Teams.findAll();
    return teams;
  }

  static async findOne(id: number) {
    const team = await Teams.findOne({
      where: {
        id,
      },
    });
    return team;
  }
}
