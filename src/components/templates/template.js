import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import FillBlankTemplateQuestionRow from './fill-blank-question-row';
import PickOneQuestionRow from './pick-one-question-row';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosBase } from '../../configs/axios-config';
import CourseService from '../../services/course-service';


import axios from 'axios';
import { navigate } from '../../navigation-ref';
const CourseTemplate = ({courseId,onCourseSubmit}) => {
    const pickOneTemplate = {
        key: "2",
        type: "pick",
        content: [
            {
                key: "1",
                type: 'text',
                value: "it's a",
            },
            {
                key: "2",
                type: 'input',
                value: 'sun',
                answer: false,
            },
            {
                key: "3",
                type: 'input',
                value: 'sunny',
                answer: true,
            },
            {
                key: "4",
                type: 'text',
                value: "day."
            }
        ]
    };

    const fillBlankTemplate = {
        key: "1",
        type: "fill",
        content: [
            {
                key: "1",
                type: 'input',
                value: "Hello",
            }, {
                key: "2",
                type: 'text',
                value: ', How are'
            },
            {
                key: "3",
                type: 'input',
                value: "you"
            }, {
                key: "4",
                type: 'text',
                value: "?"
            }
        ]
    };

    const [template, setTemplate] = useState({
        data: {
            courseName: "",
            questions: [
            ]
        }
    });

    const getKey = () => {
        if (template.data.questions.length === 0)
            return "1";
        return (parseInt(template.data.questions[template.data.questions.length - 1].key) + 1).toString();
    }

    useEffect(() => {
        console.log("use effect")
        if (courseId) {
            try {
                CourseService.getCourseById(courseId).then(function(resp){
                    const course = resp.data.course;
                    console.log(course);

                    const templateData = {
                        data: {
                            courseName: course.name,
                            courseId: course.courseId,
                            questions: [
                            ]
                        }
                    };
    
                    const content = course.contents;
                    for (const i in content) {
                        const contentData = JSON.parse(content[i].data);
                        console.log("pushed");
                        console.log(contentData);
                        templateData.data.questions.push(contentData);
                    }
                    console.log(templateData);
                    setTemplate({ ...templateData });
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            const templateData = {
                data: {
                    courseName: "",
                    questions: [
                        fillBlankTemplate,
                        pickOneTemplate
                    ]
                }
            };

            setTemplate({ ...templateData });
        }
    }, []);

    const getFillQuestionRow = (item) => {
        return (
            <FillBlankTemplateQuestionRow key={item.key} question={item}
                onDeleteRow={() => {
                    setTemplate({
                        ...template, data:
                        {
                            questions: template.data.questions.filter(q => q != item)
                        }
                    });
                }}
                onTextChange={onInputTextChange}
                onDeleteContent={onDeleteContent}
                handler={() => setTemplate({ ...template })} />
        );
    }

    const getPickOneQuestionRow = (item) => {
        return (
            <PickOneQuestionRow key={item.key} question={item}
                onDeleteRow={() => {
                    setTemplate({
                        ...template, data:
                        {
                            ...template.data,
                            questions: template.data.questions.filter(q => q != item)
                        }
                    });
                }}
                onTextChange={onInputTextChange}
                onDeleteContent={onDeleteContent}
                handler={() => setTemplate({ ...template })} />
        );
    }

    const onInputTextChange = (content, text) => {
        content.value = text;
        setTemplate({ ...template });
    }

    const onDeleteContent = (question, content) => {
        template.data.questions.forEach(q => {
            if (q === question) {
                q.content = q.content.filter(c => c != content)
            }
        });

        setTemplate({ ...template });
    }

    const renderFillQuestion = ({ item }) => {
        let row;
        if (item.type === 'fill') {
            row = getFillQuestionRow(item);
        } else if (item.type === 'pick') {
            row = getPickOneQuestionRow(item);
        }


        return row;
    }
    const createNewTemplate = (temp) => {
        const ntemplate = { ...temp };
        ntemplate.key = getKey();

        template.data.questions.push(ntemplate);
        setTemplate({ ...template });
    }

    const submit = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const req = {
                name: template.data.courseName,
                lang: "en",
                contents: []
            }

            if(template.data.courseId) {
                req.courseId = template.data.courseId;
            }

            for (const i in template.data.questions) {
                req.contents.push({
                    name: "Course" + i,
                    order: i,
                    data: JSON.stringify(template.data.questions[i])
                })
            }
            console.log(template);
            if(template.data.courseId) {
                console.log("update")
                await CourseService.updateCourse(req);
            }else{
                console.log("create")
                await CourseService.createCourse(req);
            }

            navigate('AllCourses');
         
        } catch (err) {
            console.log(err.message);
        }
    };

    const renderFillTemplate = () => {
        const questions = template.data.questions;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 10, backgroundColor: '#b4aee8', alignItems: "center", justifyContent: "space-evenly" }}>
                    <Button mode="contained" onPress={() => createNewTemplate(pickOneTemplate)}>Pick one</Button>
                    <Button mode="contained" onPress={() => createNewTemplate(fillBlankTemplate)}>Fill in the blank</Button>
                    <Button mode="contained">Match</Button>
                </View>
                <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
                    <TextInput style={{ height: 35 }} mode="outlined" label="Course Title" placeholder="Enter a title" value={template.data.courseName} onChangeText={(text) => {
                        template.data.courseName = text;
                        setTemplate({ ...template });
                    }}></TextInput>
                </View>
                <FlatList inverted contentContainerStyle={{ flexDirection: 'column-reverse' }}
                    style={{ paddingBottom: 40 }} data={questions} renderItem={renderFillQuestion} keyExtractor={item => item.key}>
                </FlatList>
                <Button style={{ height: 50 }} mode="contained" onPress={() => submit()}>Submit</Button>

            </View>
        );
    }

    return (renderFillTemplate());
}

export default CourseTemplate;