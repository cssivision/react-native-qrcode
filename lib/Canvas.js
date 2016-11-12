'use strict';

var React = require('react');
var {
    View,
    WebView
} = require('react-native');

var Canvas = React.createClass({
    propTypes: {
        style: React.PropTypes.object,
        context: React.PropTypes.object,
        render: React.PropTypes.func.isRequired
    },

    render() {
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
});

module.exports = Canvas;
