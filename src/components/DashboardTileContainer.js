import React from 'react';
import {Text, Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DashboardTileContainer = props => (
  <Tile
    titleArr={props.titleArr}
    colorArr={props.colorArr}
    imageArr={props.imageArr}
    nav={this.nav}
  />
);

export default DashboardTileContainer;
