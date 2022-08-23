import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },

  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
    allowNull: false,
  },

  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },

  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },

  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },

}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam', as: 'teamHome',
});

Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam', as: 'teamAway',
});

export default Matches;
