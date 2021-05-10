import React, { useEffect, useState } from 'react';
import { View , Text,TouchableWithoutFeedback} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CourseService from '../services/course-service';
import {navigate} from '../navigation-ref';

const CourseScreen = () => {
    const [courses,setCourses] = useState([]);

   // CourseService.getAllCourse().then(response => {setCourses(response.data.course)});
    useEffect(
        () => {
            CourseService.getAllCourse().then(response => {setCourses(response.data.course)});
        },[]
    )
    const renderCourses = ({item}) => {
        return (
            <View style={{backgroundColor:'white',borderBottomWidth:1}}>
                <TouchableWithoutFeedback  onPress={() => {navigate('CourseContent',item.contents)}}>
                    <View style={{
                     borderRadius:1, height:60,paddingLeft:20, flexDirection:'row',justifyContent:'space-between',alignItems:'center'
                 }}>
                       <Text style={{fontSize:18}}>{item.name}</Text>
                </View>
                 
                </TouchableWithoutFeedback>
            </View>
        )
    }
    return (
        <View>
            <FlatList data={courses} keyExtractor={(course) => course.courseId.toString()} renderItem={renderCourses}></FlatList>
        </View>
    )
}

export default CourseScreen;