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
            <View>
                <TouchableWithoutFeedback  onPress={() => {navigate('CourseContent',item.contents)}}>
                    <View style={{
                    borderRadius:1, padding:10, height:50
                }}>
                       <Text>{item.name}</Text>
                       <Text>Start</Text>
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