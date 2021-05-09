
import React, { useEffect, useState } from 'react';
import { View , Text,TouchableWithoutFeedback} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CourseService from '../../services/course-service';
import {navigate} from '../../navigation-ref';
import { IconButton } from 'react-native-paper';

const AllCoursesScreen = () => {
    const [courses,setCourses] = useState([]);

     useEffect(
        () => {
             CourseService.getAllCourseInfo().then(resp => {setCourses(resp.data.course)});             
         },[]
     );

     const renderCourses = ({item}) => {
         return (
             <View style={{backgroundColor:'white',borderBottomWidth:1}}>
                 <TouchableWithoutFeedback  onPress={() => {navigate('CreateCourse',{courseId:item.courseId})}}>
                     <View style={{
                     borderRadius:1, height:60,paddingLeft:20, flexDirection:'row',justifyContent:'space-between',alignItems:'center'
                 }}>
                        <Text style={{fontSize:18}}>{item.name}</Text>
                        <IconButton icon="delete" color="red" size={22} onPress={()=>{
                            CourseService.deleteCourse(item.courseId).then(function(resp){
                                setCourses(courses.filter(c => c.courseId != item.courseId));
                            });
                        }}></IconButton>
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

export default AllCoursesScreen;