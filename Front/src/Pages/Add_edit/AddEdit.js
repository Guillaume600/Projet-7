import React from "react";
import Navigation from "Shared/Composants/navigation";
import { userService } from "Shared/Services/user";
import { MdCheck } from "react-icons/md";
import { postService } from "Shared/Services/post";
import { Env } from "Env";



export default class AddEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            image: null,
            description: "",
            currentImage: null
        };

    }
    componentDidMount() {
        this.getMe();
        this.getPost();
    }
    getMe() {
        userService.getMe()
            .then((user) => {
                this.setState({
                    user
                });
            });
    }

    getPost() {
        if (this.props.id) {
            postService.get(this.props.id)
                .then((post) => {
                    console.log(post);
                    this.setState({
                        description: post.description,
                        currentImage: post.imageUrl
                    });
                });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.props.id) {
            postService.edit(
                this.props.id,
                {
                    image: this.state.image,
                    description: this.state.description
                })
                .then(() => {
                    window.location.href = "/";
                })
                .catch((error) => {
                    this.handleError(error);
                });
        } else {
            postService.create({
                image: this.state.image,
                description: this.state.description
            })
                .then(() => {
                    window.location.href = "/";
                })
                .catch((error) => {
                    this.handleError(error);
                });
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (event.target.files) {
            const file = event.target.files[0];
            this.setState({
                [name]: file
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    handleError(error) {
        this.setState({
            error: error.message
        });
        console.log(error);
    }


    render() {
        let title = "Ajouter un post";
        let imageLabel = "Ajouter une image (facultatif)";
        let image;
        if (this.props.id) {
            title = "Modifier un post";
            imageLabel = "Modifier l'image (facultatif)";
        }
        if (this.state.currentImage) {
            image = (<div>
                <p className="block text-sm font-medium text-gray-700">Image actuelle</p>
                <img className="rounded-2xl max-h-28" src={Env.urlApi + this.state.currentImage} alt="" />
            </div>);
        }
        return (
            <div className="h-full">
                <Navigation email={this.state.user?.email} />
                <div >
                <p className="text-center mb-3 text-2xl font-bold">{title}</p>
                    
                    <form className="flex flex-col items-center mx-6" onSubmit={this.handleSubmit}>
                        <div className="flex flex-col gap-5 lg:w-1/3 md:w-2/3 w-full">
                        {image}
                            <div className="flex flex-col">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">{imageLabel}</label>
                                <input className="mt-1 relative rounded-md shadow-sm focus:ring-Primaire focus:border-Primaire block min-w-full w-64 px-2 sm:text-sm border-gray-300 rounded-md" id="image" name="image" type="file" accept="image/png, image/jpeg" onChange={this.handleChange} required />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea className="focus:ring-Primaire focus:border-Primaire block min-w-full w-64 px-2 sm:text-sm border-gray-300 rounded-md" id="description" name="description" value={this.state.description} onChange={this.handleChange} required />
                            </div>
                            <div className="errMessage text-red-500">{this.state.error}</div>
                            <button className="inline-flex items-center self-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md bg-Secondaire" type="submit"  >
                                <MdCheck className="mr-3" />
                                Enregistrer le post
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}