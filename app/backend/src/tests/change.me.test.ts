import * as sinon from 'sinon';
import * as chai from 'chai';
import * as JWT from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import Teams from '../database/models/Teams';
import IToken from '../interfaces/IToken';
import ITeams from '../interfaces/ITeams';
import { schema } from '../services/loginServices';

import { app } from '../app';

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

describe('Testes do projeto Trybe-futebol-club', () => {
  describe('rota de login', () => {
    beforeEach(() => {
      sinon.stub(Users, "findOne").resolves(userMock as Users);
      sinon.stub(schema, "validate").resolves();
      sinon.stub(JWT, "sign").resolves(tokenMock);
    })

    afterEach(() => {
      sinon.restore();
    })
  
    it('Testa se o usuário faz login corretamente e retorna um token', async () => {
      
      const response = await chai.request(app)
        .post('/login')
        .send(login);

        const { token } = response.body; 
        
        expect(response.body).to.haveOwnProperty("token");
        expect(token).to.deep.equal(tokenMock);
        expect(response.status).to.equal(200);
    });
  })

  describe('rota de teams', () => {
    beforeEach(() => {
      sinon.restore();
    })

    it('testando se retorna uma lista de times', async () => {
      sinon.stub(Teams, "findAll").resolves([teamsMock] as any);
      const response = await chai.request(app) 
        .get('/teams');

      expect(response.body).to.deep.equal(teamsMock)
    });

    it('testando se retorna um time específico pelo id', async () => {
      sinon.stub(Teams, "findOne").resolves(teamsMock as any);
      const response = await chai.request(app)
        .get('/teams/:id')
        .query({ id: 1});

      console.log('corpo: ', response.body)

      expect(response.body).to.deep.equal(teamsMock);
    })
  })
});


// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

/**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
