import React from 'react';
import '../videosList.scss';
import VideoListTemplate from '../videosListTemplate';

const videosRelated = (props) => {
    return (
        <div className="relatedWrapper">
            <VideoListTemplate
                data={props.data}
                teams={props.teams}
            />
        </div>
    );
}

export default videosRelated;
