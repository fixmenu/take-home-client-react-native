import {axiosBase} from '../configs/axios-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default UserService = {
    getUsersByQuery:getUsersByQuery,
    updateUser:updateUser
}

async function getUsersByQuery(value){
    const token = await AsyncStorage.getItem('token');
    const req = {
        value:value
    }
    try {
        const response = await axiosBase.post('/admin/api/user/get-by-query', req,{headers:{'authorization':`Bearer ${token}`}});
        return response;
    } catch (err) {
        console.log(err.message);
    }

    return null;
}

async function updateUser(user){
    const token = await AsyncStorage.getItem('token');
    
    try {
        const response = await axiosBase.post('/admin/api/user/update', user,{headers:{'authorization':`Bearer ${token}`}});
        return response;
    } catch (err) {
        console.log(err.message);
    }

    return null;
}