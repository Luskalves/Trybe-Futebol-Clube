import * as sinon from 'sinon';
import * as chai from 'chai';
import * as JWT from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import Teams from '../database/models/Teams';
import IToken from '../interfaces/IToken';
// import ITeams from '../interfaces/ITeams';
import LoginService, { schema } from '../services/loginServices';

import { app } from '../app';
import BadRequest from '../errors/badRequest';
import NotAuthorized from '../errors/notAuthorized';
// import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

const tokenMock: IToken = {
  token: "qualquerCoisa",
}

const login = {
  email: 'admin@admin.com',
  password: 'senha123',
}

const userMock = {
  id: 1
}

const teamsMock = {
  id: 1,
  teamName: "name"
};

const userRoleMock = {
  role: 'some_role'
}

describe('Testes do projeto Trybe-futebol-club', () => {
  describe('rota de login', () => {
    beforeEach(() => {
      sinon.restore();
    })
  
    it('Testa se o usuário faz login corretamente e retorna um token', async () => {
      sinon.stub(Users, "findOne").resolves(userMock as Users);
      sinon.stub(schema, "validate").resolves();
      sinon.stub(JWT, "sign").resolves(tokenMock);
      const response = await chai.request(app)
        .post('/login')
        .send(login);

        const { token } = response.body; 
        
        expect(response.body).to.haveOwnProperty("token");
        expect(token).to.deep.equal(tokenMock);
        expect(response.status).to.equal(200);
    });

    it('Testa se o tipo do usuário é retornado', async () => {
      sinon.stub(Users, "findOne").resolves(userRoleMock as Users)
      const response = await chai.request(app)
        .get('/login/validate');

      expect(response.status).to.equal(200)
      expect(response.body).to.be.deep.equal(userRoleMock);
    })

    it('Testa se os campos de login existem ou estão preenchidos', async () => {
      sinon.stub(Users, "findOne").rejects();
      const response = await chai.request(app)
        .post('/login');
      
      const errorMessage = { message: 'All fields must be filled' }

      expect(BadRequest).to.throw()
      expect(response.body).to.be.deep.equal(errorMessage)
      expect(response.status).to.equal(400);
    })

    it('Testando um erro desconhecido', async () => {
      sinon.stub(LoginService, "find").throws(new Error('someError'));

      const response = await chai.request(app)
        .post('/login');
      
        const errorMessage = { message: 'someError' }

      expect(response.body).to.be.deep.equal(errorMessage)
    })

    it('Testa se os dados enviados são válidos',   async () => {
      sinon.stub(schema, "validate").resolves();
      sinon.stub(Users, "findOne").resolves();

      const response = await chai.request(app)
        .post('/login');

        const errorMessage = { message: 'Incorrect email or password' }

      expect(NotAuthorized).to.throw();
      expect(response.body).to.be.deep.equal(errorMessage);
      expect(response.status).to.equal(401);
    })
  })

  describe('rota de teams', () => {
    beforeEach(() => {
      sinon.restore();
    })

    it('testando se retorna uma lista de times', async () => {
      sinon.stub(Teams, "findAll").resolves([teamsMock] as any);
      const response = await chai.request(app) 
        .get('/teams');

      expect(response.body).to.deep.equal([teamsMock])
    });

    it('testando se retorna um time específico pelo id', async () => {
      sinon.stub(Teams, "findOne").resolves(teamsMock as any);
      const response = await chai.request(app)
        .get('/teams/:id')
        .query({ id: 1});

      expect(response.body).to.deep.equal(teamsMock);
    })
  })
});
