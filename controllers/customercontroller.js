const CustomerRepository =  require('../services/customerrepository');


function customerController() {

    async function get(req,res){
        console.log('In the customer getter');
        requestedUser = await CustomerRepository.getAllCustomers();
        return res.status(200).send(requestedUser);   
    }

    async function post(req, res) {
        let createdUser = await CustomerRepository.createUser(req.body);
        return res.status(201).send(createdUser);
    }

    return { get, post };
  }
  
  module.exports = customerController;
  