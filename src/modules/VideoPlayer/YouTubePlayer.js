// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// // import { throttle } from "./../../utils/util";

// function throttle(fn, threshhold, scope) {
//   threshhold || (threshhold = 250);
//   var last, deferTimer;
//   return function () {
//     var context = scope || this;

//     var now = +new Date(),
//       args = arguments;
//     if (last && now < last + threshhold) {
//       // hold on to it
//       clearTimeout(deferTimer);
//       deferTimer = setTimeout(function () {
//         last = now;
//         fn.apply(context, args);
//       }, threshhold);
//     } else {
//       last = now;
//       fn.apply(context, args);
//     }
//   };
// }

// class YouTubeVideo extends Component {
//   constructor(props) {
//     super(props);
//     this.youTubeContainer = React.createRef();
//     this.state = {
//       youtubeOffsetTop: '',
//       playerFixed: false,
//       playingState: -1,
//     };
//   }
//   componentDidMount = () => {
//     const _this = this;
//     let userAgent = navigator.userAgent || navigator.vendor || window.opera;
//     // -1 – unstarted, 0 – ended, 1 – playing, 2 – paused, 3 – buffering, 5 – video cued

//     if (!window.YT) {
//       // If not, load the script asynchronously
//       const tag = document.createElement('script');
//       tag.src = 'https://www.youtube.com/iframe_api';

//       // onYouTubeIframeAPIReady will load the video after the script is loaded
//       window.onYouTubeIframeAPIReady = this.loadVideo;

//       const firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//     } else {
//       // If script is already there, load the video directly
//       this.loadVideo();
//     }

//     if (typeof window != 'undefined') {
//       if (!(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)) {
//         window.setTimeout(() => {
//           window.addEventListener(
//             'scroll',
//             throttle(_this.scrollHandler.bind(_this), 100),
//           );
//         }, 1000);
//       }
//     }
//   };

//   scrollHandler() {
//     const _this = this;
//     let youtubeEle = document.querySelector('.youtube_video');
//     let youtubeOffsetTop = youtubeEle ? youtubeEle.offsetTop : '';
//     let windowScroll = window.scrollY;
//     if (
//       youtubeEle &&
//       !youtubeEle.classList.contains('sticky_player') &&
//       this.state.playingState == 1 &&
//       windowScroll > youtubeOffsetTop + 180
//     ) {
//       _this.setState({
//         youtubeOffsetTop: youtubeOffsetTop,
//         playerFixed: true,
//       });
//     } else if (
//       youtubeEle &&
//       youtubeEle.classList.contains('sticky_player') &&
//       windowScroll < _this.state.youtubeOffsetTop + 180
//     ) {
//       _this.setState({
//         youtubeOffsetTop: youtubeOffsetTop,
//         playerFixed: false,
//       });
//     }
//   }

//   loadVideo = () => {
//     const { id } = this.props;

//     // the Player object is created uniquely based on the id in props
//     this.player = new window.YT.Player(`youtube-player-${id}`, {
//       videoId: id,
//       embedConfig: {
//         primaryThemeColor: '#FF0000',
//       },
//       relatedChannels: ['UCJ04m06GHw3DUDQG6chCAUA'],
//       events: {
//         onReady: this.onPlayerReady,
//         onStateChange: this.onPlayerStateChange,
//       },
//     });
//   };

//   onPlayerReady = (event) => {
//     // event.target.playVideo();
//   };
//   onPlayerStateChange = (event) => {
//     if (event.target.getPlayerState() === 1) {
//       this.props.handleClick('YT', event.target.getPlayerState());
//     } else {
//       this.props.handleClick('YT', event.target.getPlayerState());
//     }
//     this.setState({ playingState: event.target.getPlayerState() });
//   };

//   closePlayer = () => {
//     const _this = this;
//     _this.setState({ playerFixed: false }, () => {
//       this.player.stopVideo();
//     });
//   };

//   componentWillUnmount() {
//     let _this = this;
//     window.removeEventListener('scroll', this.scrollHandler.bind(_this), false);
//   }
//   componentDidUpdate() {
//     if (this.props.isYouTubeClose && !this.props.isYTPlay) {
//       this.player.pauseVideo();
//     }
//   }
//   render = () => {
//     const { id, classes, rootConfig } = this.props;
//     return (
//       <div
//         className={`${classes} ${
//           this.state.playerFixed ? 'sticky_player' : ''
//         }`}
//         style={
//           rootConfig && rootConfig && this.state.playerFixed
//             ? { bottom: '90px' }
//             : {}
//         }
//         ref={this.youTubeContainer}
//       >
//         <div id={`youtube-player-${id}`} />
//         {/* {this.state.playerFixed ? (
//           <span className="close-btn" onClick={this.closePlayer}>
//             &#10006;
//           </span>
//         ) : null} */}
//       </div>
//     );
//   };
//   static propTypes = {
//     id: PropTypes.string.isRequired,
//   };
// }

// export default YouTubeVideo;
