import React from 'react';
import moment from 'moment';
import '../articles.scss';

const formatDate = (date ) => {
    return moment(date).format('MM-DD-YYYY');
}

const postData = (props) => {
    return (
        <div className="articlePostData">
            <div>
                Date:
                <span>{formatDate(props.data.date)}</span>
            </div>
            <div>
                <span>{props.data.author}</span>
            </div>
        </div>
    );
}

export default postData;
