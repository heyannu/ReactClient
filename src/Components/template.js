import React, { Component } from 'react';
import '../Assets/css/actionplan.css';
export default class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: this.props.User,
            description: 'Add your bio!',
            display: 'block',
            file: null,
            displayButton: true,
            displayForm: false,
            show: 'none',
        }
    }
    componentDidMount(){
        console.log(this.props.User)
    }
    change(e) {
        this.state.file = e.target.files[0];

        this.setState({
            file: this.state.file,
        })
    }

    onClick(e) {
        e.preventDefault();
        this.state.displayForm = !this.state.displayForm;
        this.state.displayButton = !this.state.displayButton
        this.setState({
            displayForm: this.state.displayForm,
            displayButton: this.state.displayButton
        })
    }
  
    get(e) {
        this.state.User.bio= e.target.value;
        this.setState({
            User: this.state.User
        })
    }
    submit(e) {
        e.preventDefault();
        this.state.displayForm = !this.state.displayForm;
        this.state.displayButton = !this.state.displayButton;
        const formData = new FormData();
        formData.append('myimage', this.state.file);
        const { _id } = this.state.User;
        console.log(this.state.User)
        fetch('http://localhost:5000/api/' + _id + "/upload",
            {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data'
                },
                body: formData,
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    success: responseJson.success,
                    message: responseJson.message,
                    file: responseJson,
                    displayForm: this.state.displayForm,
                    displayButton: this.state.displayButton
                }, () => {
                    console.log(this.state.User, this.state.file)

                })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        return (
            <div>
                <div>
                    <center><img src={this.state.User.proPic} id="dp" style={{ width: '10em', height: '11em' }} ></img></center>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.User.username}</h5>
                        <p className="card-text">
                            <p><i style={{ display: this.state.show }}>Preview</i></p>
                            <i>{this.state.User.bio}</i></p>
                    </div>

                    <center><button style={{ display: this.state.displayButton ? 'block' : 'none' }} onClick={this.onClick.bind(this)} type='button' className="btn btn-outline-info nabtn" style={{ width: '7em' }}>Update DP</button>
                        
                    </center>
    

                    <form style={{ display: this.state.displayForm ? 'block' : 'none' }} onSubmit={this.submit.bind(this)} encType='multipart/form-data'>

                        <center>
                            <input className='UploadImage' type='file' name='myimage' id='myimage' onChange={this.change.bind(this)} />
                            <label for="myimage">Choose a file</label>
                            <div><button type='submit' className="btn btn-outline-info nabtn UploadImageButton" type='submit'>Change</button></div>
                        </center>

                    </form>
                </div>
            </div>
        )
    }
}