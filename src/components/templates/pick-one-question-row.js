import React from 'react';
import { Text, View } from 'react-native';
import { TextInput, IconButton, Button } from 'react-native-paper';
import FillBlankTemplateQuestionInput from './fill-blank-question-input';

const PickOneQuestionRow = ({ question, onDeleteRow, onTextChange, onDeleteContent, handler }) => {
    const rows = [];

    for (const i in question.content) {
        const content = question.content[i];
        const label = content.type === 'input' && content.answer ? "A" : "T"
        rows.push(<FillBlankTemplateQuestionInput key = {content.key} content={content}
            label={label} onChangeText={onTextChange} onDelete={() => onDeleteContent(question, content)}/>
        );
    }

    const getKey = () => {
        if(question.content.length === 0)
            return "1";
        return  (parseInt(question.content[question.content.length -1].key) + 1).toString();
    }

    const displayFillTemplateText = () => {
        const texts = [];

        for (const i in question.content) {
            const content = question.content[i];
            if (content.type === 'input') {
                (content.answer) ? texts.push(<Button mode="contained" key={content.key} style={{ color: 'blue', fontSize: 16, fontWeight: '500', marginHorizontal: 5 }}>{content.value}</Button>)
                : texts.push(<Button mode="outlined" key={content.key} style={{ color: 'blue', fontSize: 16, fontWeight: '500',  marginHorizontal: 5 }}>{content.value}</Button>);
            } else {
                texts.push(<Text key={content.key} style={{ fontSize: 16, paddingRight: 4 }}>{content.value}</Text>)
            }

        }

        return (
            <View style={{ flexDirection: "row", flexWrap: 'wrap', alignItems: 'center' }}>
                {texts}
            </View>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: 'space-between'}}>
                <IconButton icon="close" onPress={() => {
                    onDeleteRow()
                }} />
                <View style={{ flexDirection: "row", flexWrap: "wrap",alignItems:'center'}}>
                    <Button style={{marginRight:10}} contentStyle={{height:30}} labelStyle={{fontSize:12,alignItems:'center'}} mode="outlined" icon="plus" onPress={() => {
                        question.content.push({key:getKey(), type: 'input', text: '',answer:true});
                        handler();
                    }}>True</Button>
                    <Button  style={{marginRight:10}} contentStyle={{height:30}} labelStyle={{fontSize:12,alignItems:'center'}}  icon="plus" mode="outlined" onPress={() => {
                        question.content.push({key:getKey(), type: 'input', text: '',answer:false });
                        handler();
                    }}>False</Button>
                    <Button  style={{marginRight:10}} contentStyle={{height:30}} labelStyle={{fontSize:12,alignItems:'center'}}  icon="plus" mode="outlined" onPress={() => {
                        question.content.push({key:getKey(), type: 'text', text: '' });
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

export default PickOneQuestionRow;