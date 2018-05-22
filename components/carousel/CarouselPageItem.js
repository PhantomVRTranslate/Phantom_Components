import React from "react";
import {
    Image,
    Animated
} from "react-vr";

export default class CarouselPageItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            opacity: new Animated.Value(props.isSelected ? 1 : .4)
        };
    }
    componentWillReceiveProps(next){
        if(this.props.isSelected !== next.isSelected){
            Animated.timing(this.state.opacity, {
                toValue: next.isSelected ? 1 : .4,   
                duration: 300
            }).start();
        }
    }
    render(){
        const { imageStyle, src } = this.props;

        const defaultImageStyle = {
            flex: 1,
            margin: 5,
            flexDirection: "column",
            backgroundColor: "black"
        };

        const mergedImageStyle = Object.assign({}, defaultImageStyle, imageStyle);
        return (
            <Animated.View style={{
                opacity: this.state.opacity
            }}>
                <Image
                    style={mergedImageStyle}
                    source={src}
                    source={{ uri: src }}
                />   
            </Animated.View>
        );
    }
}