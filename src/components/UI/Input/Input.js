
import React from 'react'
import classes from './Input.module.scss';


const Input = (props) => {
    const inputClasses = [classes.Input, props.className];


    if (props.isValid && props.touched) {
        inputClasses.push(classes.invalid)
    }


    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />

            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}>
                </textarea>
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    let vadlidationError = null;
    if (props.isValid && props.touched) {
        vadlidationError = `Please input a valid ${props.valueType}`;

    }

    return (

        <div className={classes.inputBox}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <span className={classes.error}>{vadlidationError}</span>
        </div>
     
    );


}






export default Input;