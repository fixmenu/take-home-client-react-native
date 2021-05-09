import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, Dimensions,TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressBar, Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { navigate, setNavigator } from '../navigation-ref';

const CourseContentScreen = (props) => {
    const initialPageIndex = {index:1}

    const { width, height } = Dimensions.get('window');
    const [pageIndexState, dispatch] = useReducer(reducer,initialPageIndex);
    const screens = [];
    const [nextReady, setNextReady] = useState(false);
    let answers = [];
    const [contentArr,setContentArr] = useState([]);
    const [pickAnswers, setPickAnswer] = useState([]);
    const [currentQuestion,setCurrentQuestion] = useState({});

    function reducer(state,action) {
        switch(action.type) {
            case 'nextPage':
                setCurrentQuestionTo(state.index);
                setIfNextContentPickTemplate(state.index + 1);
                return {index:state.index+1};
            default:
                 throw new Error();
        }
    }

    let scroll;

    const setScroll = (scrollRef) => {
        scroll = scrollRef;
    }

    const onCheckButtonPressed = () => {
        if(currentQuestion.type == "fill") {
            if (checkAnswerTrue()) {
                setNextReady(true);
            }
        }else if(currentQuestion.type == "pick"){
            const answers = currentQuestion.content.filter(c => c.type === 'input' && c.answer);
            
            if(pickAnswers.picksGroup.length == answers.length) {
                let success = false;
                for (const i in pickAnswers.picksGroup) {
                    const picksGroup = pickAnswers.picksGroup[i];
                    const pick  =  picksGroup.picks.filter(p=> p.selected);
                    if(pick.length === 1 && pick[0].answer){
                        success = true;
                    }else{
                        success = false;
                        return;
                    }
                }

                if(success){
                    setNextReady(true);
                }
            }
            
        }
    }

    const onNextButtonPressed = () => {
        dispatch({type:'nextPage'});
        scroll.scrollTo({ x: pageIndexState.index * width, y: 0, animated: true });
        setNextReady(false);
        answers = [];
    }


    function setIfNextContentPickTemplate (index) {
        const pageIndex = index;
        if(!contentArr)
            return;

        if(contentArr[pageIndex-1].type === 'pick') {
            const content = contentArr[pageIndex-1].content;
            let picks = [];
            const picksGroup = [];
            for (const i in content) {
               if(content[i].type === 'input') {
                   const pick = {
                       key: content[i].key,
                       answer:content[i].answer,
                       selected:false,
                   }

                   picks.push(pick);
               }

               if(picks.length > 0 && (content[i].type === 'text' || content.length -1 == i)) {
                picksGroup.push({picks});
                picks=[];
               }
            }

            setPickAnswer({...pickAnswers,picksGroup});
            console.log(picksGroup);
        }

       
    }

    function setCurrentQuestionTo(index) {
        if(!contentArr)
            return;
        if(!contentArr[index]) {
            console.log("end")
            navigate('Course')
        }
        setCurrentQuestion(contentArr[index]);
    }
   
    const getContentView = () => {
        for (const i in contentArr) {
            if (contentArr[i].type === 'fill') {
                screens.push(
                    <View style={{ width: width, height: height }} key={contentArr[i].key}>
                        <View style={{ marginTop: 30, marginHorizontal: 35, flexDirection: 'row', flexWrap: 'wrap',alignItems:"center"}}>{createFillQuestionRow(contentArr[i].content)}</View>
                    </View>
                );
            } else if (contentArr[i].type === 'pick') {
                screens.push(
                    <View style={{ width: width, height: height }} key={contentArr[i].key}>
                        <View style={{ marginTop: 30, marginHorizontal: 35, flexDirection: 'row', flexWrap: 'wrap', alignItems:'center' }}>{createPickQuestionRow(contentArr[i].content)}</View>
                    </View>
                );
            }
        }
    }

    const checkAnswerTrue = () => {
        const question = contentArr[pageIndexState.index - 1];
        const content = question.content;
        let success = false;

        for (const i in content) {
            const data = content[i];
            if (data.type === 'input') {
                const ans = findKeyInAnswers(data.key);
                if (ans != null) {
                    if (ans.text.toLowerCase() === data.value.toLowerCase()) {
                        success = true;
                    } else {
                        return false;
                    }
                }

            }
        }

        return success;
    }

    const findKeyInAnswers = (key) => {
        for (const i in answers) {
            if (answers[i].key === key) {
                return answers[i];
            }
        }
    }

    const createFillQuestionRow = (content) => {
        const components = [];

        for (const i in content) {
            const data = content[i];
            if (data.type === 'input') {
                components.push(<TextInput key={content[i].key} style={{ width: 80,height:40, fontSize:18,borderBottomWidth:1,marginHorizontal:10, borderColor:'blue'}} onChangeText={(text) => {
                    let foundAnswer = findKeyInAnswers(data.key);

                    if (foundAnswer == null) {
                        answers.push({ text: text, key: data.key });
                    } else {
                        foundAnswer.text = text;
                    }
                }}></TextInput>)
            } else if (data.type === 'text') {
                components.push(<Text  key={content[i].key} style={{fontSize:18}}>{data.value}</Text>)
            }
        }
        return components;
    }

    const selectPickAnswer = (key) => {
        const {pick,picks} = findPickAnswer(key);
        if(pick && picks) {
            pick.selected = true;
            picks.forEach(p => {
                if(p.key != pick.key)
                    p.selected = false
            });
            setPickAnswer({...pickAnswers});
        }
     
    }

    const findPickAnswer = (key) => {
        
        for (const i in pickAnswers.picksGroup) {
            const picks = pickAnswers.picksGroup[i].picks;
            for (const j in picks) {
                if(picks[j].key === key){
                    const pick= picks[j];
                    return {pick,picks};
                }
                    
            }
        }

        return {};
    }

    const createPickQuestionRow = (content) => {
        const components = [];
    
        for (const i in content) {
            const data = content[i];
            if (data.type === 'input') {
                const {pick} = findPickAnswer(data.key);

                components.push(<Button key={content[i].key} mode={pick && pick.selected ? "contained" : "outlined"} style={{margin:10}} onPress={()=>{
                    selectPickAnswer(data.key);
                }}>{data.value}</Button>)
            } else if (data.type === 'text') {
                components.push(<Text key={content[i].key}  style={{fontSize:18}}>{data.value}</Text>)
            }
        }
        return components;
    }

    useEffect(()=>{
        const contents = props.navigation.state.params;
        contents.forEach(function (content) {
            try {
                const data = JSON.parse(content.data);
                contentArr.push(data);
            } catch (error) {
                console.log(error);
            }
           
        });
        setContentArr({...contentArr});
        setIfNextContentPickTemplate(1);
        setCurrentQuestion(contentArr[0]);
        
    },[])

    function renderScreen() {
        getContentView();
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: 35 }}>
                    <ProgressBar progress={(1 / screens.length) * (pageIndexState.index - 1)} color={Colors.blue800} style={{
                        width: width - 100,
                    }}>
                    </ProgressBar>
                    <IconButton icon="close" />
                </View>

                <ScrollView horizontal={true} scrollEventThrottle={0} pagingEnabled={true} showsHorizontalScrollIndicator={false} scrollEnabled={false}
                    ref={(node) => setScroll(node)}>
                    {screens}
                </ScrollView>
                {(!nextReady) ? <Button style={{ marginHorizontal: 50 }} mode="contained" onPress={() => onCheckButtonPressed()}>Check answer</Button>
                    :
                    <Button style={{ marginHorizontal: 50,backgroundColor:'green' }} mode="contained" onPress={() => onNextButtonPressed()}>Next</Button>}

            </SafeAreaView>
        );
    }


    return renderScreen();
}

export default CourseContentScreen;