import React, { useState } from 'react';
import CourseTemplate from '../../components/templates/template';
import UserService from '../../services/user-service';

const CreateCourseScreen = props => {
    console.log(props)
    const renderTemplate = () => {
        return (
            <CourseTemplate courseId={props.navigation.state.params ? props.navigation.state.params.courseId : null}></CourseTemplate>
        );
    }

    return (
        renderTemplate()
    );
}

export default CreateCourseScreen;