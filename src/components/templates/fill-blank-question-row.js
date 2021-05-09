import React from 'react';
import FillBlankTemplateQuestionInput from './fill-blank-question-input';
import { Text, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

const FillBlankTemplateQuestionRow = ({ question, onDeleteRow, onTextChange, onDeleteContent,handler}) => {
    const rows = [];
    const content = question.content;
    const getInputs = (content) => {
        const label = content.type === 'input' ? "A" : "T"
        return (
            <FillBlankTemplateQuestionInput key={content.key} content={content}
                label={label} onChangeText={onTextChange} onDelete={() => onDeleteContent(question, content)}></FillBlankTemplateQuestionInput>
        );
    }

    for (const i in content) {
        rows.push(getInputs(content[i]));
    }

    const displayFillTemplateText = () => {
        const texts = [];

        for (const i in content) {
            if (content[i].type === 'input') {
                texts.push(<Text key={content[i].key} style={{ color: 'blue', fontSize: 16, fontWeight: '500', paddingRight: 4 }}>{content[i].value}</Text>)
            } else {
                texts.push(<Text key={content[i].key} style={{ fontSize: 16, paddingRight: 4 }}>{content[i].value}</Text>)
            }

        }

        return (
            <View style={{ flexDirection: "row", flexWrap: 'wrap', alignItems: 'center' }}>
                {texts}
            </View>
        )
    }


    const getKey = () => {
        if(question.content.length === 0)
            return "1";
        return  (parseInt(question.content[question.content.length -1].key) + 1).toString();
    }

    return (
        <View>
            <View style={{flexDirection:"row",flexWrap:"wrap",alignItems:"center",justifyContent:'space-between'}}>
                <IconButton icon="close" onPress={() => {
                    onDeleteRow()
                }} />
                <View style={{flexDirection:"row", flexWrap:"wrap",alignItems:'center'}}>
                    <Button style={{marginRight:10}} contentStyle={{height:30}} labelStyle={{fontSize:12,alignItems:'center'}} icon="plus" mode="outlined" onPress={() => {
                        question.content.push({key:getKey(),type:'input',text:'asdasd'});
                        handler();
                    }}>Input</Button>
                    <Button style={{marginRight:10}} contentStyle={{height:30}} labelStyle={{fontSize:12,alignItems:'center'}} icon="plus" mode="outlined" onPress={() => {
                        question.content.push({key:getKey(),type:'text',text:'asdasd'});
                        handler();
                    }}>Text</Button>
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                margin: 15,
                alignItems: "center",
                width: '100%'
            }}>
                {rows}
            </View>
            <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
                {displayFillTemplateText()}
            </View>
            <View style={{justifyContent:'center',paddingHorizontal:20, marginVertical:10}}>
                <View style={{ backgroundColor: 'grey', height: 1, width: '100%',justifyContent:'center'}}></View>
            </View>
        </View>
    );
}

export default FillBlankTemplateQuestionRow;