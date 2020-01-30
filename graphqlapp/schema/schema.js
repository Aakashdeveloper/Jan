const graphql = require('graphql');
const _ = require('lodash')

const{
    GraphQLInt,
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLString,
    GraphQLSchema
}= graphql


const products = [
    {
        "productId": 1,
        "productName": "Leaf Rake",
        "description": "Leaf rake with 48-inch wooden handle.",
        "price": 19.95,
        "starRating": 3.5
      },
      {
        "productId": 2,
        "productName": "Garden Cart",
        "description": "15 gallon capacity rolling garden cart",
        "price": 32.99,
        "starRating": 4.2
      },
      {
        "productId": 3,
        "productName": "Hammer",
        "description": "Curved claw steel hammer",
        "price": 8.9,
        "starRating": 4.8,
      },
]

const ProductType = new GraphQLObjectType({
    name:'Product',
    fields:{
        productId: {type:GraphQLInt},
        productName:{type:GraphQLString},
        description:{type:GraphQLString},
        price:{type:GraphQLFloat},
        starRating:{type:GraphQLFloat}
    }
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        product:{
            type: ProductType,
            args: {productId:{type:GraphQLInt}},
            resolve(parentValue,args){
                return _.find(products,{productId:args.productId})
                //return axios.get(`${url}/${args.productId}`)
                    //.then((res) => res.data)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery
})