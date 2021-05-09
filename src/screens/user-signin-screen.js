import React, { useContext, useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Context as AuthContext} from '../context/auth-context';

const UserSignInScreen = () => {
    const {state, signin} = useContext(AuthContext);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const signInUser = () => {
        signin({username,password});
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Welcome!</Text>
            </View>

            <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => setUsername(text)} autoCapitalize={"none"} autoCorrect={false}></TextInput>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} autoCapitalize={"none"} autoCorrect={false}></TextInput>
            <TouchableOpacity style={styles.loginButton} onPress={() => signInUser()}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.bottomSignInView}>
                <Text>Don't you have an account?    </Text>
                <TouchableOpacity onPress={() => navigate('Signup')}>
                <Text style={{fontWeight:'500',color:'blue'}}>Sign up</Text>
            </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleView: {
        position: 'absolute',
        top: 100,
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: 15,
        marginTop: 30,
        fontWeight: '300'
    },
    input: {
        width: '70%',
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5
    },
    bottomSignInView: {
        paddingTop: 30,
        width:'100%',
        flexDirection:"row",
        alignItems: "center",
        justifyContent:"center"
    },
    loginButton:{
        width:200,
        backgroundColor:'blue',
        height:40,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        marginTop: 10
    },
    loginButtonText:{
        color:'white',
        fontSize:18,
        fontWeight:'600'
    }
});

export default UserSignInScreen;
