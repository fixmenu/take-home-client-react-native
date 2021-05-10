import React from 'react';
import { View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const FillBlankTemplateQuestionInput = ({content,label, onChangeText, onDelete}) => {
    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginBottom: 10 }}>
                <TextInput mode='outlined' label={label} style={{ height: 45, minWidth: 50 }} value={content.value}  autoCapitalize="none"
                onChangeText={(text) => onChangeText(content,text)}
                />
                <IconButton icon="minus" size={15} style={{ backgroundColor: "blue" }} theme={{
                    colors: {
                        text: Colors.white
                    }
                }}
                onPress={ () => onDelete()}></IconButton>
            </View>
        </View>

    );
}

export default FillBlankTemplateQuestionInput;