import classes from './EditPost.module.scss'
import React from 'react'
import axios from '../../../services/axios'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import { connect } from 'react-redux'
import * as action from '../../../store/action/index'
import Modal from '../../../components/UI/Modal/Modal'

class EditPost extends React.Component {
    constructor(props) {
        super()
        this.state = {
            editPostForm: {
                title: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Post Title'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,

                },
                subTitle: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Post Subtitle'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false

                },
                image: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Input URL of image'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false

                },
                text: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                        placeholder: 'This is place for your new post!'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                }

            },
            isPublic: true,
            formIsValid: false,
            showModal: false,
        }
    }

    inputHandler = (event, inputIdentifier) => {

        const updatedEditPostForm = {
            ...this.state.editPostForm,
            [inputIdentifier]: {
                ...this.state.editPostForm[inputIdentifier],
                touched: true,
                valid: this.checkValidity(inputIdentifier, event.target.value),
                value: event.target.value
            }
        }

        let formIsValid = true;

        for (let key in updatedEditPostForm) {
            formIsValid = updatedEditPostForm[key].valid && true
        }

        this.setState({ editPostForm: updatedEditPostForm, formIsValid: formIsValid })


    }

    checkValidity = (inputIdentifier, value) => {
        let isValid = true
        if (inputIdentifier === 'title') {
            isValid = value.length > 10 && isValid
        }

        if (inputIdentifier === 'subTitle') {
            isValid = value.length > 5 && isValid
        }

        if (inputIdentifier === 'image') {
            isValid = (value.includes('.jpg') || value.includes('.png')
                || value.includes('.jpeg') || value.includes('.gif')) && isValid
        }

        if (inputIdentifier === 'text') {
            isValid = value.trim().length > 40 && isValid
        }

        return isValid

    }

    isPublic() {
        this.setState(prevState => {
            return {
                isPublic: !prevState.isPublic
            }
        })
    }



    componentDidMount() {
        let id = this.props.match.params.id

        axios(`/posts/${id}`)
        .then(res => {
            const results = res.data
            const updatedEditPostForm = {
                ...this.state.editPostForm,
                title: {
                    ...this.state.editPostForm['title'],
                    value: results.title,
                    valid: this.checkValidity('title', results.title)
                },
    
                subTitle: {
                    ...this.state.editPostForm['subTitle'],
                    value: results.subtitle,
                    valid: this.checkValidity('subTitle', results.subtitle)
                },
    
                image: {
                    ...this.state.editPostForm['image'],
                    value: results.imageUrl,
                    valid: this.checkValidity('image', results.imageUrl)
                },
    
               text: {
                   ...this.state.editPostForm['text'],
                    value: results.text,
                    valid: this.checkValidity('text', results.text)
            } 
    
            }

     

       
            this.setState({
                editPostForm: updatedEditPostForm,
                sid: results.sid,
         
            })
    
        })   
    }

    updatePostHandler = () => {
 
        let id = this.props.match.params.id

        const data = {
            title: this.state.editPostForm.title.value,
            subtitle: this.state.editPostForm.subTitle.value,
            imageUrl: this.state.editPostForm.image.value,
            text: this.state.editPostForm.text.value,
            sid: this.state.sid
          

        }

        this.setState({
            showModal: true
        })
    
       
        setTimeout(() => {
            this.setState({
                showModal: true
            })
              this.props.editPost(id, data)
              this.props.history.push('/my-posts')
        
        }, 1000);

      

        
    }


    deletePostHandler = () => {
        let id = this.props.match.params.id

        const data = {
            title: this.state.editPostForm.title.value,
            subtitle: this.state.editPostForm.subTitle.value,
            imageUrl: this.state.editPostForm.image.value,
            text: this.state.editPostForm.text.value,
            sid: this.state.sid
          

        }

        this.setState({
            showModal: true
        })
    
       
        setTimeout(() => {
            this.setState({
                showModal: true
            })
            this.props.deletePost(id, data)
              this.props.history.push('/my-posts')
        
        }, 1500);




    }


    render() {

    

        const updatedForm = []
        for (let key in this.state.editPostForm) {
            updatedForm.push({
                id: key,
                config: this.state.editPostForm[key]
            })

        }
        const editPost = updatedForm.map(newPostElement => {
            return <Input
                key={newPostElement.id}
                elementType={newPostElement.config.elementType}
                elementConfig={newPostElement.config.elementConfig}
                value={newPostElement.config.value}
                isValid={!newPostElement.config.valid}
                touched={newPostElement.config.touched}
                valueType={newPostElement.id}
                changed={(event) => this.inputHandler(event, newPostElement.id)}
            />

        })


        return (
            <>
          {this.state.showModal ? <Modal show = {true}><p>The post is succefully updated!</p></Modal> : null}
                <div className={classes.editPostForm}>
          
                    <h1 className={classes.header}>Edit your post</h1>
                    {/*      <Switcher oN={'Public'} oF={'Private'} clicked={this.isPublic} />  */}
                    <form className={classes.formInput} onSubmit={this.onSubmitForm}>
                        {editPost}
                        <div className={classes.btnContainer}>
                            <Button className = {classes.active} disabled={!this.state.formIsValid} clicked={this.updatePostHandler}>Update Post</Button>
                            <Button className = {classes.active}  clicked={this.deletePostHandler}>Delte Post</Button>
                        </div>

                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        singlePost: state.post.singlePost
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editPost: (id, data) => dispatch(action.editPost(id, data)),
        deletePost: (id, data) => dispatch(action.deletePost(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)