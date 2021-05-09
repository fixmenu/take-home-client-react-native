import axios from 'axios';
import createDataContext from './create-data-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigation-ref';
import {axiosBase} from '../configs/axios-config';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signup':
            return { ...state, token: action.payload };
        case 'signin':
                return { ...state, token: action.payload };
        default:
            return state;
    }
}

const signup = dispatch => async ({ email, password, username, role }) => {
    try {
        const response = await axiosBase.post('/signup', { email, password, username, role });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signup', payload: response.data.token });
        navigate('mainFlow');
    } catch (err) {
        console.log(err.message);
    }
};

const signin = dispatch => async ({ username, password }) => {
        try {
            const response = await axiosBase.post('/signin', { username, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token });

            if(response.data.role === 'A')
            {
                navigate('adminFlow');
            }else{
                navigate('mainFlow');
            }
           
        } catch (err) {
            console.log(err.message);
        }
};

export const { Provider, Context } = createDataContext(authReducer, { signup,signin }, { token: null });