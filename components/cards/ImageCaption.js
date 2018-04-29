import React from "react";
import { View, Image, VrButton, Text } from "react-vr";
import TextCard from "./TextCard.js";

import CardContainer from "./CardContainer";

// import ImageZoom from 'imageZoom';

export default class ImageCaption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCaption: this.props.alwaysShow || false
    };

    console.log(this.state);
  }

  toggleCaption() {
    this.setState({ displayCaption: !this.state.displayCaption });
  }

  render() {
    let displayCaption;
    if (!this.props.alwaysShow) {
      displayCaption = this.state.displayCaption ? 1 : 0;
    } else {
      displayCaption = 1;
    }

    const toggleHandler = this.props.alwaysShow
      ? () => {}
      : this.toggleCaption.bind(this);

    const { flex, cardStyling, captionStyling } = this.props;

    const defaultCaptionStyling = {
      flex: 1,
      minWidth: "100%",
      minHeight: "100%",
      fontSize: 50,
      color: "#FFF",
      fontWeight: "500",
      textAlign: "center",
      textAlignVertical: "center",
      padding: "10"
    };

    const mergedCaptionStyling = Object.assign(
      {},
      defaultCaptionStyling,
      captionStyling
    );

    return (
      <CardContainer flex={flex} cardStyling={cardStyling}>
        <VrButton
          onEnter={toggleHandler}
          onExit={toggleHandler}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <Image
            source={{ uri: this.props.src }}
            style={{
              width: "100%",
              height: "100%"
            }}
          />
          <VrButton
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              opacity: displayCaption,
              alignItems: "center"
            }}
          >
            <Text style={mergedCaptionStyling}>{this.props.caption || this.props.children}</Text>
          </VrButton>
        </VrButton>
      </CardContainer>
    );
  }
}
