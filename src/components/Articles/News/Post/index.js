import React, {Component} from 'react';
import { firebase, firebaseDB, firebaseLooper, firebaseTeams } from '../../../../firebase';
import Header from './header';

import '../../articles.scss';

class NewsArticles extends Component {
    state ={
        article : [],
        team: [],
        imageURL:'',
    }

    componentDidMount() {
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
            .then((snapshot)=>{
                let article = snapshot.val();

                firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
                    .then((snapshot)=>{
                        const team = firebaseLooper(snapshot);
                        this.setState({
                            article,
                            team:team,
                        })
                        this.getImageURL(article.image)
                    })
            })
        //fetch(`${URL}/articles?id=${this.props.match.params.id}`)
            //.then(response=>response.json())
            //.then(data=>{
                //let article = data[0]

                //fetch(`${URL}/teams?id=${article.team}`)
                    //.then(response=>response.json())
                    //.then(data=>this.setState({
                        //article,
                        //team:data
                    //}))
            //})
    }

    getImageURL = (filename) => {
        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
            .then(url => {
                this.setState({
                    imageURL : url,
                })
            })
    }

    render() {
        const article = this.state.article;
        const team = this.state.team[0];

        return (
            <div className="article_wrapper">
                <Header
                    teamData={team}
                    date={article.date}
                    author={article.author}
                />
                <div className="articleBody">
                    <h1>{article.title}</h1>
                    <div className="articleImage" style={{
                        background:`url(${this.state.imageURL})`
                    }}>
                    </div>
                    <div className="articleText"
                        dangerouslySetInnerHTML={{
                            __html: article.body
                        }}
                    >
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsArticles;
