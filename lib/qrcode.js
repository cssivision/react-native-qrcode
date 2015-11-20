'use strict'

var React = require('react-native');
var Canvas = require('./Canvas.js');
var {
    View
} = React;
var qr = require('qr.js');

module.exports = React.createClass({
    propTypes: {
        context: React.PropTypes.object,
        render: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            height: 200,
            width: 200,
            value: 'https://github.com/cssivision',
        }
    },

    renderCanvas: function(canvas) {
        var ctx = canvas.getContext('2d');
        canvas.width = this.props.width;
        canvas.height = this.props.height;
        canvas.style.left = (window.innerWidth - 200)/2 + 'px';
        if(window.innerHeight>200) canvas.style.top = (window.innerHeight - 200)/2 + 'px';

    },

    render: function() {
        return (
            <View>
                <Canvas
                    context={{this.props.context}}
                    render={this.renderCanvas}
                    style={{height: this.props.height, width: this.props.width}}
                />
            </View>
        );
    }
});
