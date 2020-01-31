let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing my api', () => {
    it("Shoudle return status as 200 for '/'",(done) => {
        chai
            .request('http://localhost:7800')
            .get('/')
            .then((res) => {
                expect(res).to.have.status(200);
                done();
            })
            .catch((err) => {
                throw err
            })
    })
    it("Shoudle return status as 200 for '/'",(done) => {
        chai
            .request('http://localhost:7800')
            .get('/weather')
            .then((res) => {
                expect(res).to.have.status(200)
                chai.request(`http://localhost:7800/${res.id}`)
                .then((res) => {
                    expect(res).to.have.status(200)
                })
                done();
            })
            .catch((err) => {
                throw err
            })
    })
    it("Shoudle return status as 200 for '/post'",(done) => {
        chai
            .request('http://localhost:7800')
            .post('/abc')
            .send({name:'abc'},headers:{''})
            .expect(200)
            .end((err,res) => {
                done(err)
            })
    })
})