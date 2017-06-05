/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Dimensions from 'Dimensions';

// Precalculate Device Dimensions for better performance
const deviceHeight = Dimensions.get('window').height;

import Camera from 'react-native-camera';

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCamera: false,
      cameraType: Camera.constants.Type.back
    }

    this._onBarCodeRead = this._onBarCodeRead.bind(this);
    this.barCodeScanStatus = this.barCodeScanStatus.bind(this);
  }

  _onBarCodeRead(e) {

   this.setState({showCamera: false});
    Alert.alert(
        "Barcode Found!",
        "Type: " + e.type + "\nData: " + e.data
    );
  }

  renderCamera() {
    if(this.state.showCamera) {
      return (
        <Camera
            ref="cam"
            style={styles.container}
            onBarCodeRead={this._onBarCodeRead}
            type={this.state.cameraType}>
        </Camera>
      );
    } else {
        return (
            <View style={styles.container}>
              <Text>Please press start to start the Camera</Text>
            </View>
        );
    }
  }

  barCodeScanStatus(flag) {
    this.setState({
      showCamera: flag
    })
  }

  render() {
    return (
      <View>
        {this.renderCamera()}
        <TouchableOpacity 
          onPress={e => this.barCodeScanStatus(true)}
          style={styles.btnStyle}
        >
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={e => this.barCodeScanStatus(false)}
          style={styles.btnStyle}
        >
          <Text>Stop</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight - 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    btnStyle: {
      backgroundColor: "#ccc",
      padding: 10,
      borderWidth: 1,
      borderColor: "#fff",
      justifyContent: "center",
      alignItems: "center"
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
