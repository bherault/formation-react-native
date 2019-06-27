/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Video from 'react-native-video';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class VideoComponent extends React.Component {

  state = {
    videoStatus: "Readind",
  }

  onEndCallback = () => {
    this.setState({
      videoStatus: "Ended!"
    });
    this.props.videoEnded(this.props.uri);
  }

  render() {
    // Exemple pour passer un paramètre optionnel
    let size = 20;
    if (this.props.size) {
      size = this.props.size;
    }
    return (
      <Video 
        controls={this.props.controls}
        source={{uri: this.props.uri}}
        onEnd={() => this.onEndCallback()}
        style={styles.backgroundVideo} />
    );
  }
}

VideoComponent.propTypes = {
  controls: PropTypes.bool.isRequired,
  size: PropTypes.number,
  uri: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'relative',
    width: 400,
    height: 260,
  },
});
