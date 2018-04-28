import React from "react";
import { 
    AppRegistry, 
    asset, 
    Pano, 
    Text, 
    View,
    CylindricalPanel,
} from "react-vr";

// Import your custom pages hereimport ContentPlane from './ContentPlane';
import NavBar from './navbar/Navbar';

// import { navbarContent } from '../helperFiles/content';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      gallery: <Gallery1/>
    };

    this.changeGallery = this.changeGallery.bind(this);
  }

  render() {
    
    return (
      <View>
      {/* // <ContentPlane>
      //  </ContentPlane>

      //   <NavBar /> */}
      </View>
    );
  }
}
