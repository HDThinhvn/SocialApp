import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomePage from "../HomePage/HomePage";
import Messenger from "../Messenger/Messenger";
import MoreNews from "../MoreNews/MoreNews";
import UserPage from "../UserPage/UserPage";
import EditProfileScreen from "../UserPage/EditProfileScreen";
import ChatScreen from "../Messenger/ChatScreen";
import Notification from "../Notification/Notification";
import CommentSreen from "../HomePage/CommentSreen";
import TBnotification from "../TBnotification/TBnotification";
import { auth, firebase, app, firebaseConfig } from "../../firebase";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="PageMessages"
      component={Messenger}
      options={{
        headerTitle: "Tin nhắn",
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#2e64e5",
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: "#fff",
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Trang chủ"
      component={HomePage}
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#2e64e5",
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: "#fff",
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={UserPage}
      options={{
        title: "",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Comment"
      component={CommentSreen}
      options={{
        title: "Bình luận",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="NameProfile"
      component={UserPage}
      options={{
        headerTitle: "Trang cá nhân",
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#2e64e5",
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: "#fff",
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: "Sửa thông tin",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0,
        },
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

// const CustomTabBarButton = ({children})

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2e64e5",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Find"
        component={Notification}
        options={{
          headerTitle: "Tìm kiếm",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#2e64e5",
            fontSize: 18,
          },
          headerStyle: {
            shadowColor: "#fff",
            elevation: 0,
          },
        }}
      />
      {auth.currentUser?.email == "admin@gmail.com" ? (null):(<Tab.Screen
        name="AddPost"
        component={MoreNews}
        options={{
          headerTitle: "Đăng bài",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#2e64e5",
            fontSize: 18,
          },
          headerStyle: {
            shadowColor: "#fff",
            elevation: 0,
          },
        }}
      />)}
      <Tab.Screen
        name="Tb"
        component={TBnotification}
        options={{
          headerTitle: "Thông Báo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#2e64e5",
            fontSize: 18,
          },
          headerStyle: {
            shadowColor: "#fff",
            elevation: 0,
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubbles-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={"AddPost"}
        component={MoreNews}
        options={{
          headerTitle: "Đăng bài",
          tabBarIcon: ({ focused }) => (
            <View style={styles.addPostBttn}>
              <Ionicons name="add-outline" color="#fff" />
            </View>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#2e64e5",
            fontSize: 18,
          },
          headerStyle: {
            shadowColor: "#fff",
            elevation: 0,
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  addPostBttn: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2e64e5",
  },
});
