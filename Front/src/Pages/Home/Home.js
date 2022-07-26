import React from "react";
import Navigation from "Shared/Composants/navigation";
import Post from "Shared/Composants/post";
import { Link } from "react-router-dom";
import { postService } from "Shared/Services/post";
import { userService } from "Shared/Services/user";
import { MdAdd } from "react-icons/md";



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: null,
            loading: true
        };

    }
    componentDidMount() {
        this.getAll();
        this.getMe();
    }
    getAll() {
        postService.getAllPosts()
            .then((posts) => {
                this.setState({
                    loading: false,
                    posts
                });
            });
    }
    getMe() {
        userService.getMe()
            .then((user) => {
                this.setState({
                    user
                });
            });
    }

    deletePost = (postId) => {
        this.setState({
            posts: this.state.posts.filter(post => {
                return post._id !== postId;
            })
        });

    }

    render() {
        let content = <p className="flex justify-center items-center h-full">Chargement ...</p>;
        if (!this.state.loading) {
            let posts = [];
            this.state.posts.forEach(post => {
                posts.push(<Post key={post._id} post={post} onDelete={this.deletePost} user={this.state.user} />)
            })
            content = (
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col  justify-center lg:w-1/3 md:w-2/3 w-full">
                        <Link to="/addedit" className="inline-flex items-center self-end px-4 py-2 mr-8 font-semibold leading-6 text-sm shadow rounded-md bg-Secondaire ">
                            <MdAdd />
                            Ajouter un post
                        </Link>
                        {posts}
                    </div>
                </div>
            );
        };
        return (
            <div className="h-full">
                <Navigation email={this.state.user?.email} />
                <div className="h-full" >{content}</div>
            </div>
        );
    }
}
