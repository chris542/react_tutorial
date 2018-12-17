import React, {Component} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import './newsList.scss';
import { firebaseTeams,firebaseArticles,firebaseLooper } from '../../../firebase';

import Button from '../Buttons/buttons';
import CardInfo from '../CardInfo/cardInfo';

class NewsList extends Component {
    state={
        teams:[],
        items:[],
        start:this.props.start,
        end:this.props.start + this.props.amount,
        amount: this.props.amount
    }
    componentWillMount() {
        this.request(this.state.start, this.state.end);
    }

    request = (start, end) => {
        if(this.state.teams.length < 1){
            firebaseTeams.once('value')
                .then((snapshot)=>{
                    const teams = firebaseLooper(snapshot);
                    this.setState({
                        teams
                    })
                })

            //fetch(`${URL}/teams`)
                //.then(response=>response.json())
                //.then(data=>this.setState({
                    //teams:data
                //}))
        }

        firebaseArticles.orderByChild("id").startAt(start).endAt(end).once('value')
            .then((snapshot)=>{
                const article = firebaseLooper(snapshot);
                this.setState({
                    items:[...this.state.items,...article],
                    start,
                    end,
                })
            })

        //fetch(`${URL}/articles?_start=${start}&_end=${end}`)
            //.then(response=>response.json())
            //.then(data=>this.setState({
                //items:[...this.state.items,...data],
                //start,
                //end,
            //}))
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end +1 , end);
    }

    renderNews=(type)=>{
        let template=null;

        switch(type){
            case('card'):
                template = this.state.items.map( (item,i) => ( 
                    <CSSTransition
                        classNames={{
                            enter:"newsList_wrapper",
                            enterActive:"newsList_wrapper_enter",
                        }}
                        timeout={500}
                        key={i}
                    >
                        <div>
                            <div className="newslist_item">
                            <Link to={`/articles/${item.id}`}>
                                <CardInfo
                                    teams={this.state.teams}
                                    team={item.team}
                                    date={item.date}
                                />
                                <h2>{item.title}</h2>
                            </Link>
                        </div>
                    </div>
                    </CSSTransition>
                ));
                break;

            case('cardMain'):
                template = this.state.items.map( (item,i) => ( 
                    <CSSTransition
                        classNames={{
                            enter:"newsList_wrapper",
                            enterActive:"newsList_wrapper_enter",
                        }}
                        timeout={500}
                        key={i}
                    >
                        <Link to={`/articles/${item.id}`}>
                            <div className="flex_wrapper">
                                <div className="left" style={{
                                    background:`url(/images/articles/${item.image})`
                                }}>
                                    <div></div>
                                </div>
                                <div className="right">
                                    <CardInfo
                                        teams={this.state.teams}
                                        team={item.team}
                                        date={item.date}
                                    />
                                    <h2>{item.title}</h2>
                                </div>
                            </div>
                        </Link>
                    </CSSTransition>
                ));
                break;

            default:
                template=null;
        }

        return template;

    }
    render() {
        return (
            <div>
                <TransitionGroup
                    component="div"
                    className="list"
                >
                    {this.renderNews(this.props.type)}
                </TransitionGroup>
                <Button
                    type="loadmore"
                    loadMore={()=>this.loadMore()}
                    cta="Load More News"
                />
            </div>
        );
    }
}

export default NewsList;
