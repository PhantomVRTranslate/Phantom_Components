import React from "react";
import {
    VrButton,
    Animated,
    View
} from 'react-vr';

import { Easing } from 'react-native';

export default class GazeButton extends React.Component{
    constructor(props){
        super(props);
        const progressWidth = new Animated.Value(0);

        this.state = {
            progressWidth
        };

        this.timeout = 1000;
        this.triggerSelection = this.triggerSelection.bind(this);
    }

    triggerSelection(){
        Animated.timing(
            this.state.progressWidth, {
              toValue: 0,
              duration: 200,
              easing: Easing.linear
            }).start();

        const { onTrigger } = this.props;
        if (onTrigger) onTrigger();
    }

    onEnter(e){
        Animated.timing(
            this.state.progressWidth, {
              toValue: this.props.progressWidth || .2,
              duration: 1000,
              easing: Easing.linear
            }).start();

        this.interval = setTimeout(this.triggerSelection, this.timeout); 


        const { onHover } = this.props;
        if (onHover) onHover();
    }

    onExit(){
        Animated.timing(
            this.state.progressWidth, {
              toValue: 0,
              duration: 200,
              easing: Easing.linear
            }).start();

        clearTimeout(this.interval);
        
        const { onLeave } = this.props;
        if (onLeave) onLeave();
    }

    render(){
        const { buttonStyle, progressDisabled, progressColor } = this.props;

        const defaultStyle = {
                    width: .5,
                    overflow: 'hidden',
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  };
        
        const mergedStyle = Object.assign({}, defaultStyle, buttonStyle);

        return ( 
            <VrButton 
                onEnter={this.onEnter.bind(this)} 
                onExit={this.onExit.bind(this)}
                style={mergedStyle}
            >
                {this.props.children}
                { !progressDisabled ? <Animated.View 
                    style={{
                        backgroundColor:(progressColor || 'rgb(200, 200, 200)'),
                        bottom: 0,
                        width: this.state.progressWidth,
                        height: .01,
                    }}
                /> : <View /> }
            </VrButton>
        );
    }
}