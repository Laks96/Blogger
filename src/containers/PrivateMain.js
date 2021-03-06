import React from 'react'
import DashBoard from './DashBoard/DashBoard'
import { Redirect, Route, Switch } from 'react-router-dom'
import NewPost from './DashBoard/NewPost/NewPost'
import Authorization from './Authorization/Authorization';
import Logout from './Authorization/Logout/Logout';
import Posts from './Posts/Posts'
import MyPosts from './DashBoard/MyPosts/MyPosts';
import EditPost from './DashBoard/EditPost/EditPost';
import ReadPost from './ReadPost/ReadPost';

class PrivateMain extends React.Component {


    render() {
        return <>






            <DashBoard>

                <Switch>
                    <Route  path='/new-post' component={NewPost} />
                    <Route path='/authorization' component={Authorization} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/posts' component={Posts} />
                    <Route path='/my-posts' component={MyPosts} />
                    <Route path='/edit-post/:id' component={EditPost} />
                    <Route path='/post/:id' component={ReadPost} />
                    <Redirect to='/' />
                </Switch>
            </DashBoard>







        </>
    }
}

export default PrivateMain;