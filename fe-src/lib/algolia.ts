import * as dotenv from "dotenv"
dotenv.config()
import  algoliasearch from "algoliasearch"

const client = algoliasearch('G5G9RMFS44', process.env.ALGOLIA_1);
const index = client.initIndex('dev_js');


console.log(process.env.ALGOLIA_1);


export {index}