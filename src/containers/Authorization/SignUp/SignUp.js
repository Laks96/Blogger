import React from 'react'
import classes from './SignUp.module.scss'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components//UI/Button/Button'
import {Redirect, withRouter} from 'react-router-dom'
import NavBar from '../../../components/UI/Nav/Nav'
import * as action from '../../../store/action/index'
import {connect} from 'react-redux'

class SignUp extends React.Component {
    state = {
        auth: {

            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,

            },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,

            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email adress'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,

            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            }
            
        },
        isAuth: this.props.isAuth
    }

    inputHandler = (event, inputIdentifier) => {
        const updatedAuth = {
            ...this.state.auth,
            [inputIdentifier]: {
                ...this.state.auth[inputIdentifier],
                value: event.target.value,
                touched: true,
                valid: this.chechkValidity(inputIdentifier, event.target.value)
            }
        }

        this.setState({auth: updatedAuth})
    }

    chechkValidity = (inputIdentifier, value) => {
      
        let isValid = true

        const emailCheck = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(inputIdentifier === 'firstName') {
            isValid = value.trim() !== '' && isValid
        }

        if(inputIdentifier === 'lastName') {
            isValid = value.trim() !== '' && isValid
        }
        if(inputIdentifier === 'email') {
            isValid = emailCheck.test(value) && isValid
        }

        if(inputIdentifier === 'password') {
            isValid = value.length >= 6 && isValid
        }

        return isValid



    }

    onSignUpHandler = (event) => {
        event.preventDefault()
        const signUpData = {
            name: this.state.auth.firstName.value,
            email: this.state.auth.email.value,
            password: this.state.auth.password.value
        }
        this.props.onSignUp(signUpData)

    }

    componentDidMount () {
   
    }



    render() {
        const updatedForm = [];

        for (let key in this.state.auth) {
            updatedForm.push({
                id: key,
                config: this.state.auth[key]
            })
        }

        const form = updatedForm.map(formElement => {
            return <Input
                key = {formElement.id}
                changed={(event) => this.inputHandler(event, formElement.id)}
                elementType={formElement.config.elementType}
                label={formElement.config.label}
                elementConfig={formElement.config.elementConfig}
                touched={formElement.config.touched}
                value={formElement.config.value}
                isValid = {!formElement.config.valid}
                shoudBeValidate={formElement.config.validation}
                valueType = {formElement.id}

            />

        })

        let redirecting = null

        if(this.state.isAuth || this.props.isAuth) {
         this.props.history.push('/dashboard')
        }
        return <div className={classes.signIn}>
  
            <NavBar />
  
            <form onSubmit={this.onSignUpHandler}>
            {redirecting}
                <p className = {classes.signInText}>Sign Up</p>
                {form}
                <p className={classes.errorHandler}>{this.props.onError}</p>
                <Button className={classes.signInBtn}>Sign Up</Button>
                <p className={classes.switcher} onClick={this.props.onSwitch}>Alredy have an account? Click here to Login!</p>
            </form>
        </div>
    }

}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token,
        onError: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (signUpData) => dispatch(action.signUp(signUpData))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))