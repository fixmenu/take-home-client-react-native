import {axiosBase} from '../configs/axios-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default CourseService = {
    getAllCourse:getAllCourse,
    getAllCourseInfo:getAllCourseInfo,
    getCourseById:getCourseById,
    updateCourse:updateCourse,
    createCourse:createCourse,
    deleteCourse:deleteCourse
}

async function getAllCourse(){
    const token = await AsyncStorage.getItem('token');
    
    try {
        const response = await axiosBase.get('/api/course/get-all',{headers:{'authorization':`Bearer ${token}`}});
        
        return response;
    } catch (err) {
        console.log(err.message);
    }

    return null;
}

async function getAllCourseInfo(){
    const token = await AsyncStorage.getItem('token');
    
    try {
        const response = await axiosBase.get('/admin/api/course/get-info',{headers:{'authorization':`Bearer ${token}`}});
        
        return response;
    } catch (err) {
        console.log(err.message);
    }

    return null;
}


async function getCourseById(id){
    const token = await AsyncStorage.getItem('token');
    const req = {
        courseId:id
    }
    try {
        const response = await axiosBase.post('/admin/api/course/get-by-id',req,{headers:{'authorization':`Bearer ${token}`}});
        
        return response;
    } catch (err) {
        console.log(err.message);
    }

    return null;
}

async function updateCourse(req){
    const token = await AsyncStorage.getItem('token');

    try {
        const response = await axiosBase.post('/admin/api/course/update', req, { headers: { 'authorization': `Bearer ${token}` }});
        
        return response;
    } catch (err) {
        console.log(err.message);
    }

    return null;
}


async function createCourse(req){
    const token = await AsyncStorage.getItem('token');

    try {
        const response = await axiosBase.post('/admin/api/course/create', req, { headers: { 'authorization': `Bearer ${token}` } });
        
        return response;
    } catch (err) {
        console.log(err.message);
    }

    return null;
}

async function deleteCourse(courseId){
    console.log(courseId);
    const req= {
        courseId:courseId
    };

    const token = await AsyncStorage.getItem('token');

    try {
        const response = await axiosBase.post('/admin/api/course/delete', req, { headers: { 'authorization': `Bearer ${token}` } });
        
        return response;
    } catch (err) {
        console.log(err.message);
    }

    return null;
}

