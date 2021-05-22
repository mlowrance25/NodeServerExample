require('should');

const request = require('supertest');

process.env.ENV = 'Test';

const app = require('../app.js');


const agent = request.agent(app);

const CustomerModel = require('../models/customermodel');



describe('API Tests Pt0',  function(){
    describe('#Test Create Customer',  async ()=>{
        it('should return the created customer successfully' ,(done)=>{
           let testCustomer = {FirstName: 'Marvin',LastName:'Lowrance',Company:'Marvs Test Company'};
            agent.post('/customer')
            .send(testCustomer)
            .expect(201)
            .end((err,results) =>{
                if (err){
                    console.log('There was an error creating a customer');
                    console.log(err);
                    done(err);
                }else{
                    results.body.should.have.property('FirstName','Marvin');
                    results.body.should.have.property('LastName','Lowrance');
                    results.body.should.have.property('Company','Marvs Test Company');
                    done();
                }
            });
        });
    });
    after((done) =>{
        CustomerModel.deleteMany({}).exec();
        done();
    });
});