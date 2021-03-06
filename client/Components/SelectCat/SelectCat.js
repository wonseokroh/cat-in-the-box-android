import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Dimensions,
  BackHandler
} from "react-native";
import Cat from "../Cat/Cat";
import styles from "./styles";
import Tutorial from "../Tutorial/Tutorial";

const { height } = Dimensions.get("window");
export default class SelectCat extends Component {
  state = {
    firstornot: false
  };
  static navigationOptions = {
    headerTitle: (
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontFamily: "Goyang", fontSize: 17, color: "white" }}>
          슈뢰딩거의 고양이에 온걸 환영한다옹
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: "#f4da6c",
      height: height * 0.07
    },
    headerLeft: <View />,
    headerRight: <View />
  };
  _handleBackPress = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this._handleBackPress);
    this._isFirstTime();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._handleBackPress);
  }
  render() {
    const upperCats = [1, 2, 3];
    const lowerCats = [4, 5, 6];
    return (
      <View style={styles.body}>
        <Tutorial />
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.text}>고양이를 고를고양</Text>
          </View>
          <View style={styles.catContainer}>
            <View style={styles.cats}>
              {upperCats.map(cat => (
                <Cat key={cat} id={cat} sendCatInfom={this._sendCatInfom} />
              ))}
            </View>
            <View style={styles.cats}>
              {lowerCats.map(cat => (
                <Cat key={cat} id={cat} sendCatInfom={this._sendCatInfom} />
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }
  // 고양이를 누르면 고양이 정보를 보내주고 화면을 넘김
  _sendCatInfom = async (catId, store) => {
    try {
      await store.socket.emit("info", catId);
      await AsyncStorage.removeItem("firstTime");
      await this.props.navigation.navigate("OpenBoxScreen");
    } catch (err) {
      console.log(err);
    }
  };

  _isFirstTime = async () => {
    const first = await AsyncStorage.getItem("firstTime");
    if (first) {
      this.setState({
        firstornot: true
      });
    }
  };
}
