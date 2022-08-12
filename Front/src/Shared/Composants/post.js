import { Env } from "Env";
import moment from "moment";
import "moment/locale/fr";
import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdThumbUp } from "react-icons/md";
import { postService } from "Shared/Services/post";




export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            like:0
        };
    }

    like = () => {
        postService.like(this.props.post._id)
        .then(() => {
            if (this.props.post.usersLiked.includes(this.props.user._id)) {
                return;
            }
            this.setState({
                like:1
            });
        });
    }

    render() {
        moment.locale("fr");
        const date = moment(this.props.post.createdAt).format('lll');
        let img;
        if (this.props.post.imageUrl) {
            img = <img className="rounded-2xl" src={Env.urlApi + this.props.post.imageUrl} alt="" />
        }
        let action;
        if (this.props.user?.isAdmin || this.props.post.author._id === this.props.user?._id) {
            action = (<div>
                <button className="inline-flex items-center mr-2 px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md bg-Secondaire">
                    <MdEdit className="mr-3"/>
                    Modifier</button>
                <button className="inline-flex items-center px-4 py-3 font-semibold leading-6 text-sm shadow rounded-md text-white bg-Primaire">
                    <MdDelete size="15"/>
                    </button>
            </div>);
        }
        return (
            <div className="border-solid border-2 border-Tertiaire rounded-2xl m-8 p-3 shadow-2xl shadow-Secondaire ">
                {img}
                <div className="flex justify-between py-4 text-sm text-Tertiaire">
                    <p>{this.props.post.author.email}</p>
                    <p>{date}</p>
                </div>
                <p className="pb-4">{this.props.post.description}</p>
                <div className="flex justify-between">
                    <button onClick={this.like} className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md bg-Secondaire">
                        <MdThumbUp size="15" className="mr-3"/>
                        <span>{this.props.post.usersLiked.length + this.state.like} like(s)</span></button>
                    {action}
                </div>
            </div>
        )
    }
}

