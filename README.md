###this module only work for iOS
#react-native-qrcode
A React-native component to generate [QRcode](http://en.wikipedia.org/wiki/QR_code).
##Installation
```sh
npm install react-native-qrcode
```
##Usage
```jsx
'use strict';

var React = require('react-native');
var QRCode = require('react-native-qrcode');
var {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} = React;

var helloworld = React.createClass({
    getInitialState: function() {
        return {
            text: 'http://facebook.github.io/react-native/',
        };
    },
    render: function() {
        return (
            <View style={{marginTop: 30}}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text: text})}
                />
                <QRCode
                    value={this.state.text}
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

AppRegistry.registerComponent('helloworld', () => helloworld);

module.exports = helloworld;
```
## Available Props

prop      | type                 | default value
----------|----------------------|--------------
`value`   | `string`             | `http://facebook.github.io/react-native/`
`size`    | `number`             | `128`
`bgColor` | `string` (CSS color) | `"#FFFFFF"`
`fgColor` | `string` (CSS color) | `"#000000"`

<img src='qrcode.png' height = '256' width = '256'/>

