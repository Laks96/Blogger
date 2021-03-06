import React from 'react'
import classes from './Login.module.scss'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components//UI/Button/Button'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../../../store/action/index'

class LogIn extends React.Component {
    constructor(props) {
        super()
        this.state = {
            auth: {

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
            isAuth: null,
            valid: false,
            touched: false
        }

    }
    inputHandler = (event, inputIdentifier) => {
        const updatedAuth = {
            ...this.state.auth,
            [inputIdentifier]: {
                ...this.state.auth[inputIdentifier],
                touched: true,
                value: event.target.value,
                valid: this.chechkValidity(inputIdentifier, event.target.value)


            }
        }
        this.setState({ auth: updatedAuth })
    }

    chechkValidity = (inputIdentifier, value) => {

        let isValid = true

        const emailCheck = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if (inputIdentifier === 'email') {
            isValid = emailCheck.test(value) && isValid
        }

        if (inputIdentifier === 'password') {
            isValid = value.length >= 6 && isValid
        }

        return isValid



    }



    loginHandler = (event) => {
        event.preventDefault()
        this.props.onLogin(this.state.auth.email.value, this.state.auth.password.value)
    }



    render() {

        console.log(this.props.onError)
        const updatedAuth = [];
        for (let key in this.state.auth) {
            updatedAuth.push({
                id: key,
                config: this.state.auth[key]
            })

        }

        const form = updatedAuth.map(formElement => {
            return <Input
                key={formElement.id}
                changed={(event) => this.inputHandler(event, formElement.id)}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                touched={formElement.config.touched}
                isValid={!formElement.config.valid}
                value={formElement.config.value}
                valueType={formElement.id}

            />
        })

        let redirecting = null

        if (this.props.isAuth) {
            return redirecting = <Redirect to='/new-post' />
        }

        return <div className={classes.logIn}>


            <form onSubmit={this.loginHandler}>


                <p className={classes.logInText}>Login</p>
                {form}
                <p className={classes.errorHandler}>{this.props.onError}</p>
                <Button className={classes.logInBtn}>Login</Button>
                <p className={classes.switcher} onClick={this.props.onSwitch}>Don't have an account? Click here to Sign Up!</p>
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
        onLogin: (email, password) => dispatch(action.login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)