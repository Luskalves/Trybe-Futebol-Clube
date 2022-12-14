import { homeQuery, awayQuery } from './querys/querysMatches';
import model from '../database/models';

export default class LeaderService {
  constructor(public leaderModel = model) {}
  public async getHome() {
    const [querys] = await this.leaderModel.query(homeQuery);

    return querys;
  }

  public async getAway() {
    const [querys] = await this.leaderModel.query(awayQuery);

    return querys;
  }
}
