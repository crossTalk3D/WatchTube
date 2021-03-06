import React from 'react';
import ReactPlayer from 'react-player';
import SidebarVideoItem from '../sidebar_video_item';
import VideoBar from '../video_bar/video_bar';
import CommentsContainer from '../../comments/comments_container';
import { shuffleVideos } from '../../../util/api_util_functions';

class VideoShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    this.props.getOneVideo(this.props.id);
    this.props.getAllVideos();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.props.getOneVideo(nextProps.id);
    }
    this.setState({ videos: this.getSidebarVideos(nextProps.videos)} );
  }

  getSidebarVideos(videos) {
    if (typeof videos === 'undefined') return null;
    const sidebarVideos = shuffleVideos(videos).slice(0, 8);

    return sidebarVideos.map((video, idx) => (
      <div className="sidebar-videos" key={idx}>
        <SidebarVideoItem video={video}/>
      </div>
    ));
  }

  render() {
      const { video } = this.props;
      if (!video) return null;
      const date = new Date(video.created_date).toDateString().slice(3);

      return(
        <div className="video-show-container">
          <div className="main-video-container">
            <div className='video-player'>
              <ReactPlayer
                url={video.video_url}
                controls={true}
                playing={true}/>
            </div>

            <div className="video-title-container">
              <div className="video-title">{video.title}</div>
              <div className="video-user-details">
                <img className="video-avatar" src={video.user.avatar_url}/>
                <div className="video-username">{video.user.username}</div>
              </div>
              <div className="video-views">
                {video.views.toLocaleString()} views</div>
            </div>

            <div className="video-detail-container">
              <div className="video-date">Published on {date}</div>
              <div className="video-description">{video.description}</div>
            </div>

            <CommentsContainer/>
          </div>

          <div className="video-sidebar-container">
            <div className="video-sidebar-title">Related Videos</div>
            <div className="video-sidebar-videos">
              {this.state.videos}
            </div>
          </div>

        </div>
      );
  }
}

export default VideoShow;
