import React, { useContext, useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Context as AuthContext} from '../context/auth-context';

const UserSignUpScreen = () => {
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

    const {state, signup} = useContext(AuthContext);
    const [role, setRole] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const roleSelection = (type) => {
        setRole(type);
    }

    const signupUser = () => {
        if(password == confirmPassword) {
            signup({email,password,username,role});
        }
    }
    return (
        <View style={{paddingTop:50}}>
            <View style={styles.typeSelectionContainer}>
                <Text>How will you user carna?</Text>
                <View style={styles.buttonBar}>
                    <TouchableOpacity style={role === "I" ? styles.activeTypeButton : styles.deactiveTypeButton} onPress={() => roleSelection("I")}>
                        <Text style={styles.typeButtonText}>Invidually</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={role === "T" ? styles.activeTypeButton : styles.deactiveTypeButton} onPress={() => roleSelection("T")}>
                        <Text style={styles.typeButtonText}>As a Teacher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={role === "S" ? styles.activeTypeButton : styles.deactiveTypeButton} onPress={() => roleSelection("S")}>
                        <Text style={styles.typeButtonText}>As a Student</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{paddingTop: 30, paddingLeft: 30}}>
                <TextInput autoCapitalize="none" style={styles.input} placeholder="Username" onChangeText={(username) => setUsername(username)}></TextInput>
                <TextInput autoCapitalize="none" style={styles.input} placeholder="E-mail" onChangeText={(email) => setEmail(email)}></TextInput>
                <TextInput autoCapitalize="none" style={styles.input} placeholder="Password" onChangeText={(password) => setPassword(password)}></TextInput>
                <TextInput autoCapitalize="none" style={styles.input} placeholder="Confirm Password" onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}></TextInput>
        
            </View>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => {
                   signupUser();
                }}>
                        <Text style={styles.typeButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>   
        </View>
    );


}

export default UserSignUpScreen;
