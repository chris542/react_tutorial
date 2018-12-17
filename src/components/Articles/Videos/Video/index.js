import React, {Component} from 'react';
import { firebaseDB, firebaseLooper, firebaseTeams, firebaseVideos } from '../../../../firebase';
import  '../../articles.scss';
import Header from './header';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated';

class VideoArticle extends Component {
    state = {
        article : [],
        team: [],
        related:[],
    }

    componentDidMount() {
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
            .then((snapshot)=>{
                let article = snapshot.val();

                firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
                    .then((snapshot)=>{
                        const team = firebaseLooper(snapshot);
                        this.setState({
                            article,
                            team:team,
                        })
                        this.getRelated();
                    })
            })
        //fetch(`${URL}/videos?id=${this.props.match.params.id}`)
            //.then(response=>response.json())
            //.then(data=>{
                //let article = data[0]

                //fetch(`${URL}/teams?id=${article.team}`)
                    //.then(response=>response.json())
                    //.then(data => {
                        //console.log(data)
                        //this.setState({
                            //article,
                            //team:data
                        //}); 
                        //this.getRelated();
                    //})
            //})
    }

    getRelated = () => {
        firebaseTeams.once('value')
            .then((snapshot)=>{
                const teams = firebaseLooper(snapshot);

                console.log(teams)

                firebaseVideos
                    .orderByChild('team')
                    .equalTo(this.state.article.team)
                    .limitToFirst(3).once('value')
                    .then((snapshot)=>{
                        const related = firebaseLooper(snapshot);
                        this.setState({
                            teams,
                            related,
                        })
                    })

            })
        //fetch(`${URL}/teams`)
            //.then(res=>res.json())
            //.then(data=>{
                //let teams = data;

                //fetch(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
                    //.then(res=>res.json())
                    //.then(data=>{
                        //this.setState({
                            //teams,
                            //related:data
                        //})
                    //})
            //})
    }

    render() {
        const article = this.state.article;
        const team = this.state.team[0];

        return (
            <div>
                <Header
                    teamData={team}
                    date={article.date}
                    author={article.author}
                />
                <div className="videoWrapper">
                    <h1>{article.title}</h1>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${article.url}`}
                    >
                    </iframe>
                    <VideosRelated
                        data={this.state.related}
                        teams={this.state.teams}
                    />
                </div>
            </div>
        );
    }
}
export default VideoArticle;
