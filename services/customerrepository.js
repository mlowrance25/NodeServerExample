const CustomerModel= require('../models/customermodel');


function customerRepository(){

    async function createUser(userDetails){
        console.log('About to create a new customer');
        let newUser = new CustomerModel({
            FirstName : userDetails.FirstName,
            LastName : userDetails.LastName,
            Company : userDetails.Company,
        });
        await newUser.save();
        return newUser;
    }

    async function getAllCustomers(){
        let allCustomers = await CustomerModel.find({}).exec();
        return allCustomers;
    }

    async function getCustomersByFilter(filter){
        let users = await UserModel.find(filter).exec();
        return users;
    }

    return{
        createUser : createUser,
        getAllCustomers : getAllCustomers,
        getCustomersByFilter : getCustomersByFilter,
    }
}

module.exports = customerRepository();