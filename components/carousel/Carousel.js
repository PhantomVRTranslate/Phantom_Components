import React from "react";
import { View, Text, VrButton } from "react-vr";

import CarouselItem from "./CarouselItem";
import CardContainer from "../cards/CardContainer";

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNum: this.props.initialCard || 0,
      textSlices: [],
      maxTextSize: this.props.maxTextSize || this.props.flex > 1 ? 200 : 120
    };

    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    if (this.props.type === "image") return;
    let textSlices = [];

    // if text is given as a string or through the text prop
    if (typeof this.props.children === "string" || this.props.text) {
      const text = this.props.children || this.props.text;
      for (let i = 0; i < text.length; i += this.state.maxTextSize) {
          textSlices.push(text.slice(i, i + this.state.maxTextSize));
        }

    } else { // if text is given in <Text /> components
      for (let text of this.props.children) {
        text = text.props.children;
          for (let i = 0; i < text.length; i += this.state.maxTextSize) {
            textSlices.push(text.slice(i, i + this.state.maxTextSize));
          }
      }
    }

    this.setState({ textSlices });
  }

  scroll(type) {
    const len = this.props.type === "image" ? 
      this.props.imageCollection.length : this.state.textSlices.length;
      // scary looking expression due to javascript negative modulo handling
    const cardNum = type === 'prev' ? 
      (((this.state.cardNum - 1) % len) + len) % len : (this.state.cardNum + 1) % len; 
    this.setState({ cardNum });
  }

  render() {
    const { type, flex, imageCollection, cardStyling, buttonStyling, arrowStyling } = this.props;

    const defaultButtonStyling = {
        borderRadius: 40,
        opacity: 0.85,
        paddingLeft: 0.06,
        borderWidth: 0.01,
        width: 70,
        height: 70,
        backgroundColor: "#333",
        borderColor: "#222",
        position: "absolute",
        bottom: -90,
        right: 10,
        left: 10,
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
      <View>
        <VrButton
        style={leftButtonStyling}
          onClick={() => this.scroll('prev')}
        >
          <Text
            style={mergedArrowStyling}
          >
            {"<"}
          </Text>
        </VrButton>
        <VrButton
          onClick={() => this.scroll('next')}
          style={rightButtonStyling}
        >
          <Text
            style={mergedArrowStyling}
          >
            {">"}
          </Text>
        </VrButton>
      </View>);

    return (
      <CardContainer flex={flex || 1}
      cardStyling={cardStyling} >
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <CarouselItem
            card={imageCollection ? imageCollection[this.state.cardNum] : null}
            type={type}
            flex={flex}
          >
            {type === "text" ? this.state.textSlices[this.state.cardNum] : ''}
          </CarouselItem>
            {scrollButtons}
        </View>
      </CardContainer>
    );
  }
}
