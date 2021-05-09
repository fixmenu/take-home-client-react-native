import React from 'react';
import UserSignUpScreen from './src/screens/user-signup-screen';
import UserSignInScreen from './src/screens/user-signin-screen';
import CourseScreen from './src/screens/course-screen';
import AdminPanelScreen from'./src/screens/admin/admin-panel-screen';
import CreateCourseScreen from './src/screens/admin/create-course-panel';

import {createSwitchNavigator, createAppContainer,createB} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider as AuthProvider} from './src/context/auth-context';
import {setNavigator} from './src/navigation-ref';
import CourseContentScreen from './src/screens/course-content-screen';
import UserEditPanelScreen from './src/screens/admin/user-edit-panel-screen';
import AllCoursesScreen from './src/screens/admin/all-courses-screen';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signin: UserSignInScreen,
    Signup: UserSignUpScreen,
  }),
  mainFlow: createStackNavigator({
    Course: CourseScreen,
    CourseContent: CourseContentScreen,
  }),
  adminFlow: createStackNavigator({
    AdminPanel:AdminPanelScreen,
    CreateCourse: CreateCourseScreen,
    UserEdit:UserEditPanelScreen,
    AllCourses:AllCoursesScreen
  }),
  
})

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => {setNavigator(navigator)}}></App>
    </AuthProvider>
  );
};