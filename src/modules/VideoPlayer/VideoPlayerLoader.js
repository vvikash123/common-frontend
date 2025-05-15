import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { SlikeLoaderScript } from 'utils/common';
import SlikePlayer from './Video';
export default class VideoPlayerLoader extends Component {
  componentDidMount() {
    // SlikeLoaderScript();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.videoId.id != this.props.videoId.id ||
      nextProps.videoId.startTime != this.props.videoId.startTime
    );
  }

  render() {
    return (
      <>
        {
          <SlikePlayer
            fullData={this.props.fullData}
            categoryType={this.props.categoryType}
            videoData={this.props.videoId && this.props.videoId}
            isShare={this.props.isShare}
            msid={this.props.msid}
            isVideo={this.props.isVideo}
            isPlay={this.props.isPlay}
            isVideoStart={this.props.isVideoStart}
            playerId={this.props.playerId}
            youTubePlayerClose={this.props.youTubePlayerClose}
            handleClick={this.props.handleClick}
            nextVideo={this.props.nextVideo}
            imageWidth={this.props.imageWidth}
            isLiveTv={this.props.isLiveTv}
            autoPlay={this.props.autoPlay}
            demoFromQuery={this.props.demoFromQuery}
          />
        }
      </>
    );
  }
}
