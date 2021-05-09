import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, IconButton, Searchbar } from 'react-native-paper';
import { useDebounce, useDebouncedCallback } from 'use-debounce/lib';
import { navigate } from '../../navigation-ref';
import UserService from '../../services/user-service';

const AdminPanelScreen = (props) => {

    const [users, setUsers] = useState([]);
    const courseTemplate = {};
    const [searchText, setSearchText] = useState("");
    const [value] = useDebounce(searchText, 1000);

    const debounced = useDebouncedCallback(
        (text) => {
            UserService.getUsersByQuery(searchText).then(response => {
                setUsers(response.data.user);
            });
        },
        500
    );

    function setUser(user) {
        UserService.getUsersByQuery(searchText).then(response => {
            setUsers(response.data.user);
        });
    }


    const renderUser = ({ item }) => {

        return (
            <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10, borderWidth: 1, borderRadius: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <View style={{ borderRadius: 50, backgroundColor: 'blue', width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                            <Text style={{ fontSize: 25, color: 'white', fontWeight: '600' }}>{item.username.substring(0, 1).toUpperCase()}</Text>
                        </View>
                        <View>
                            <Text style={{ paddingBottom: 5 }}>{item.username}</Text>
                            <Text>{item.email}</Text>
                        </View>
                    </View>

                    <IconButton icon="pencil" onPress={() => {
                        navigate('UserEdit', { user: item, callback: setUser });
                    }}></IconButton>
                </View>

            </View>
        )
    }

    return (
        <View style={{ flex: 1, margin: 15 }}>
            <View style={{ flexDirection: "row", paddingHorizontal: 10,paddingVertical:10, justifyContent: 'space-between' }}>
                <Button mode="outlined" icon="plus" style={{ width: 215 }} onPress={() => navigate('CreateCourse')}>Create New Course</Button>
                <Button mode="outlined" style={{ width: 150 }} onPress={() => navigate('AllCourses')}>See Courses</Button>
            </View>

            <Searchbar
                autoCapitalize="none"
                value={searchText}
                style={{ margin: 10, elevation: 0, borderColor: '#7251b5asdsa', borderWidth: 0.2 }}
                inputStyle={{ fontSize: 14 }} theme={{
                    colors: {
                        text: "#7251b5",
                        placeholder: "#7251b5",
                    }
                }} placeholder="Search users by username or email"
                onChangeText={(text) => {
                    setSearchText(text);
                    debounced(text)
                }}
            >
            </Searchbar>
            <FlatList data={users} keyExtractor={(user) => user.userId} renderItem={(user) => renderUser(user)}>

            </FlatList>
        </View>
    );
}

export default AdminPanelScreen;