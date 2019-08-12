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
        render: PropTypes.func.isRequired,
        onLoad: PropTypes.func,
        onLoadEnd: PropTypes.func,
    },

    render() {
        var contextString = JSON.stringify(this.props.context);
        var renderString = this.props.render.toString();
        return (
            <View style={this.props.style}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    scalesPageToFit={Platform.OS === 'android'}
                    contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                    source={{html: "<style>*{height:100%;width:100%;margin:0;padding:0;overflow:hidden;}canvas{transform:translateZ(0);}</style><canvas></canvas><script>var canvas = document.querySelector('canvas');(" + renderString + ").call(" + contextString + ", canvas);</script>"}}
                    opaque={false}
                    underlayColor={'transparent'}
                    style={this.props.style}
                    javaScriptEnabled={true}
                    scrollEnabled={false}
                    onLoad={this.props.onLoad}
                    onLoadEnd={this.props.onLoadEnd}
                    originWhitelist={['*']}
                />
            </View>
        );
    }
});

module.exports = Canvas;
