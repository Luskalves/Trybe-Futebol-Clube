import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import IToken from '../interfaces/IToken';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const tokenMock: IToken = {
  token: "qualquerCoisa",
}
const login = {
  email: "e@e.com",
  password: "123456",
}

describe('Testes do projeto Trybe-futebol-club', () => {
  describe('rota de login', () => {
    beforeEach(() => {
      sinon.stub(Users, "findOne").resolves({} as Users);
    })

    afterEach(() => {
      sinon.restore();
    })
  
    it('Testa se p usuário faz login corretamente e retorna um token', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(login);

        expect(response.body).to.equal(tokenMock)
    });
  })
});


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
