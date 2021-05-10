import React, { useState } from 'react';
import { Text,StyleSheet, View,TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { navigate } from '../../navigation-ref';
import userService from '../../services/user-service';
import UserService from '../../services/user-service'

export const UserEditPanelScreen = (props) => {
    console.log(props);
    const [user,setUser] = useState(props.navigation.state.params.user);
    const callback = props.navigation.state.params.callback;

    
    const roleSelection = (role) => {
        setUser({...user,role:role});
    }
    return (
        <View style={{marginHorizontal:20}}>
            <TextInput autoCapitalize="none" mode="outlined" value={user.username} onChangeText={(text) => {
                setUser({...user,username:text});
            }}></TextInput>
            <TextInput autoCapitalize="none" mode="outlined" value={user.email} onChangeText={(text) => setUser({...user,email:text})}></TextInput>
            <View style={styles.buttonBar}>
            <TouchableOpacity style={user.role === "I" ? styles.activeTypeButton : styles.deactiveTypeButton} onPress={() => roleSelection("I")}>
                        <Text style={styles.typeButtonText}>Invidually</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={user.role  === "T" ? styles.activeTypeButton : styles.deactiveTypeButton} onPress={() => roleSelection("T")}>
                        <Text style={styles.typeButtonText}>As a Teacher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={user.role  === "S" ? styles.activeTypeButton : styles.deactiveTypeButton} onPress={() => roleSelection("S")}>
                        <Text style={styles.typeButtonText}>As a Student</Text>
                    </TouchableOpacity>
            </View>
            <Button onPress={() => {
                
                userService.updateUser(user).then(
                    function(resp) {
                        setUser(user);
                        callback(user);
                        navigate('AdminPanel')
                    }
                );
            }}>Submit</Button>
        </View>
    );
}


const styles = StyleSheet.create({
        typeSelectionContainer: {
            paddingTop: 15,
            paddingLeft: 30,
        },
        buttonBar: {
            marginTop: 15,
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center'
        },
        activeTypeButton: {
            padding: 10,
            marginRight: 10,
            justifyContent: 'center',
            height: 60,
            borderRadius: 5,
            backgroundColor: 'green'

        },
        deactiveTypeButton: {
            padding: 10,
            marginRight: 10,
            justifyContent: 'center',
            height: 60,
            borderRadius: 5,
            backgroundColor: 'blue'

        },
        typeButtonText: {
            fontSize: 13,
            color: 'white',
            fontWeight: '600'
        },
        input: {
            width: '90%',
            height: 40,
            paddingLeft: 10,
            paddingRight: 10,
            marginVertical: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'blue'
        },
        confirmButton: {
            width: 100,
            height: 50,
            marginTop: 30,
            padding:10,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: 'green',
            borderRadius:100
        }
});

export default UserEditPanelScreen;