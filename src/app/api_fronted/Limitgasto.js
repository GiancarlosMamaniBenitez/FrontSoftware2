
import Base from './base'

const endpoint = 'Limit';

const create = async (request) => await Base.post(endpoint,request);

const findAll = async() => await Base.get(endpoint);

const findOne = async(id) => {
    const newEndpoint = endpoint.concat('/',id);

    return await Base.get(newEndpoint);
}

const update = async(id,request) => 
{
    const newEndpoint = endpoint.concat('/',id);
    return await Base.put(newEndpoint, request)
}

const remove = async(id) => {
    const newEndpoint = endpoint.concat('/',id);

    return await Base.remove(newEndpoint);
}

const LimitgastoApi = { create, findAll, findOne, update, remove }


export default LimitgastoApi;