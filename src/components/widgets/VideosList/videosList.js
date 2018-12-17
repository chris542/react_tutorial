import React, {Component} from 'react';
import './videosList.scss';
import Button from '../Buttons/buttons';
import VideosListTemplate from './videosListTemplate';

import { firebaseVideos, firebaseTeams, firebaseLooper } from '../../../firebase';


class VideosList extends Component {
    state ={
        teams:[],
        videos:[],
        start:this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
    }

    renderTitle = () => {
        return this.props.title 
            ? <h3><strong>NBA</strong> Videos</h3>
            : null
    }

    componentWillMount() {
        this.request(this.state.start,this.state.end)
    }

    request=(start,end)=>{
        if(this.state.teams.length < 1 ){
            firebaseTeams.once('value')
                .then((snapshot)=>{
                    const teams = firebaseLooper(snapshot);
                    this.setState({
                        teams
                    })
                })
            //fetch(`${URL}/teams`)
                //.then(response => response.json())
                //.then(data=> this.setState({
                    //teams : data
                //}))
        }
        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
            .then((snapshot)=>{
                const articles = firebaseLooper(snapshot);
                this.setState({
                    videos:[...this.state.videos,...articles ],
                    start,
                    end,
                })
            })
        //fetch(`${URL}/videos?_start=${start}&_end=${end}`).then(response=>response.json())
            //.then(data=>this.setState({
                //videos:[...this.state.videos,...data ],
                //start,
                //end,
            //}))
    }


    renderVideos = () => {
        let template = null;
        switch(this.props.type){

            case('card'):
                template = (
                    <VideosListTemplate
                        data={this.state.videos}
                        teams={this.state.teams}
                    />
                )
                break;

            default:
                template=null;
        }
        return template;
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end)
    }

    renderButton = () => {
        return this.props.loadmore
            ? <Button type="loadmore" loadMore={()=>this.loadMore()} cta={"Load More Videos"}></Button>
            : <Button type="linkTo" cta="More videos" linkTo="/videos/"/>
    }

    render() {
        return (
            <div className="videoList_wrapper">
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        );
    }
}

export default VideosList;
