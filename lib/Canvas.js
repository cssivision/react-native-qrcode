'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var {
    View,
    WebView,
    Platform
} = require('react-native');

var Canvas = createReactClass({
    propTypes: {
        style: PropTypes.object,
        context: PropTypes.object,
        render: PropTypes.func.isRequired
    },

    componentDidMount() {
        var canvas = this.refs.canvas;
        this.props.render&&this.props.render.call(this.props.context, canvas);
    },

    render() {
        if(Platform.OS === 'web') {
            return (
              <View style={this.props.style}>
                  <canvas style={{flex:1}} ref="canvas"></canvas>
              </View>
            );
        }else {
            var contextString = JSON.stringify(this.props.context);
            var renderString = this.props.render.toString();
            return (
                <View style={this.props.style}>
                    <WebView
                      automaticallyAdjustContentInsets={false}
                      contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                      source={{html: "<style>*{margin:0;padding:0;}canvas{transform:translateZ(0);}</style><canvas></canvas><script>var canvas = document.querySelector('canvas');(" + renderString + ").call(" + contextString + ", canvas);</script>"}}
                      opaque={false}
                      underlayColor={'transparent'}
                      style={this.props.style}
                      javaScriptEnabled={true}
                      scrollEnabled={false}
                    />
                </View>
            );
        }

    }
});

module.exports = Canvas;
