import React from "react";
import { Easing } from 'react-native';
import {
    asset,
    Image,
    View,
    VrButton,
    Animated,
    Button,
    StyleSheet,
    Text,
    CylindricalPanel
} from 'react-vr';
import CarouselPageItem from "./CarouselPageItem";

class CarouselPage extends React.Component {
    constructor(props){
        super(props);
        
        this.scroll = this.scroll.bind(this);
        this.rotateCarousel = this.rotateCarousel.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onExit = this.onExit.bind(this);

        const cardNum = this.props.initialImage || Math.ceil(this.props.images.length / 2);
        this.width = this.props.width || this.props.height || 600;
        this.height = this.props.height || this.props.width || 600;

        const carouselRotation = new Animated.Value(this.getPosition(cardNum));

        this.state = {
            width: this.width,
            height: this.height,
            leftOpacity: new Animated.Value(.7),
            rightOpacity: new Animated.Value(.7),
            cardNum,
            containerWidth: this.width * this.props.images.length,
            carouselRotation,
            slideLeft: new Animated.Value(-1024),
            fadeIn: new Animated.Value(0)       
        };
    }

    componentDidMount() {
        Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.slideLeft, {
                toValue: 0,
                duration: 2000,
                easing: Easing.linear
              }),
              Animated.timing(this.state.fadeIn, {
                toValue: 1,
                duration: 2000,
                easing: Easing.bezier(0.5, 0.34, 0.3, 0.88)
              })
            ])
          ]).start();
    }

    componentWillReceiveProps(nextProps) {
        Animated.sequence([
            Animated.parallel([
              Animated.timing(this.state.slideLeft, {
                toValue: 1024,
                duration: 2000,
                easing: Easing.linear
              }),
              Animated.timing(this.state.fadeIn, {
                toValue: 0,
                duration: 2000,
                easing: Easing.linear
              })
            ])
          ]).start();
    }

    onEnter(type) {
        Animated.timing(this.state[`${type}Opacity`], {
            toValue: 1,
            duration: 200,
            easing: Easing.linear
        }).start();
    }

    onExit(type) {
        Animated.timing(this.state[`${type}Opacity`], {
            toValue: .7,
            duration: 200,
            easing: Easing.linear
        }).start();
    }

    scroll(type) {
        const nextCardNum = type === 'prev' ? this.state.cardNum - 1 : this.state.cardNum + 1;
        const nextRotation = this.getPosition(nextCardNum); 
        this.setState({
            cardNum: nextCardNum
        });
        this.rotateCarousel(nextRotation);
    }

    rotateCarousel(rotation){
        Animated.timing(this.state.carouselRotation, {
            toValue: rotation,   
            duration: 500,
            easing: Easing.bezier(0.5, 0.34, 0.3, 0.88)
        }).start();
    }

    getPosition(cardNum) {
        // for getting center position
        const basePosition = -(this.width / 2);

        // 10 because each box has a margin of 5 (5 + 5 = 10)
        const scaleFactor = this.width + 10;

        // -1 to compensate for 1-index for props
        const currCard = cardNum - 1;

        // because center card has a value of 0
        const centerCard = (this.props.images.length / 2);

        return basePosition + (centerCard - currCard) * scaleFactor;
    }

    render() {
        const { images, buttonStyling, arrowStyling } = this.props; 
        const { cardNum, containerWidth, carouselRotation, width, height, leftOpacity, rightOpacity } = this.state;   
        const imageStyle = {
            height,
            width,
        };

        const defaultButtonStyling = {
            borderRadius: 40,
            paddingLeft: 0.06,
            borderWidth: 0.01,
            width: 70,
            height: 70,
            backgroundColor: "#333",
            borderColor: "#222",
            position: "absolute",
            bottom: -400,
            right: -500,
            left: -500,
            justifyContent: 'flex-end',
            alignItems: 'center'
        };
    
        const mergedButtonStyling = Object.assign({}, defaultButtonStyling, buttonStyling);
    
        const rightButtonStyling = Object.assign({}, mergedButtonStyling);
        delete rightButtonStyling.left;
        const leftButtonStyling = Object.assign({}, mergedButtonStyling);
        delete leftButtonStyling.right;
    
        const defaultArrowStyling = {
          color: "white",
          fontSize: 80,
          fontWeight: "bold"
        };
    
        const mergedArrowStyling = Object.assign({}, defaultArrowStyling, arrowStyling);
    
        const scrollButtons = (
          <View style={{
              position: 'absolute',
          }}>
          <Animated.View
            style={{ opacity: leftOpacity }}>
            <VrButton
                onEnter={() => this.onEnter('left')} 
                onExit={() => this.onExit('left')}
                style={leftButtonStyling}
                onClick={() => {if (cardNum > 1) this.scroll('prev');}}
            >
              <Text
                style={mergedArrowStyling}
              >
                {"<"}
              </Text>
            </VrButton>
            </Animated.View>
            <Animated.View
            style={{ opacity: rightOpacity }}>
            <VrButton
                onEnter={() => this.onEnter('right')} 
                onExit={() => this.onExit('right')}
                onClick={() => {if (cardNum < images.length) this.scroll('next');}}
                style={rightButtonStyling}
            >
              <Text
                style={mergedArrowStyling}
              >
                {">"}
              </Text>
            </VrButton>
            </Animated.View>
          </View>);

        return (
            <Animated.View
                style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                opacity: this.state.fadeIn,
                transform: [{ translateX: this.state.slideLeft }]
                }}
                >
                <Animated.View 
                    style={{
                    opacity: 1,
                    flex: 1,
                    flexDirection: "row",
                    width: containerWidth,
                    height,
                    justifyContent: 'center',
                    transform: [
                        { translateX: carouselRotation }
                    ]}} 
                >      
                    {this.props.images.map((image, idx) => {
                        const isSelected = (idx + 1) === cardNum;
                        return (
                            <CarouselPageItem
                                imageStyle={imageStyle}
                                src={image}
                                isSelected={isSelected}
                            />   
                        );
                    })}                   
                </Animated.View>
                {scrollButtons}
            </Animated.View>
        );
    }
}

export default CarouselPage;