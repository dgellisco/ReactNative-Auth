// DEPENDENCIES
// Import React and React-Native
import React, { Component } from 'react';
import { Text } from 'react-native';
// Import packages
import firebase from 'firebase';
// Import local components
import { Button, Card, CardSection, Input, LoadingSpinner } from './common';

class LoginForm extends Component {
    // TEXT STEP2 - Text is saved to the state
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    };

    onButtonPress() {
        this.setState({ error: '', loading: true });

        // Destructure state to store just email and password for this function
        const { email, password } = this.state;
        // Use firebase method to login
        firebase.auth()
            // Attempt to sign in with firebase
            .signInWithEmailAndPassword(email, password)
            // Successful login case.
            .then(this.onLoginSuccess.bind(this))
            // Failed to login.  One this 1st fail, attempt to create user.
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    // Successful login case.
                    .then(this.onLoginSuccess.bind(this))
                    // Failed to login.  On this 2nd fail, give error message.
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginFail() {
        this.setState({
            error: 'Authentication Failed',
            loading: false
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <LoadingSpinner size='small' />
        }
        return (
            <Button onPressFunction={this.onButtonPress.bind(this)}>
                Log In
            </Button>
        );

    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder='user@gmail.com'
                        label='Email'
                        // TEXT STEP3 - Text is updated onLoginSuccess() {
                        value={this.state.email}
                        // TEXT STEP1 - When text is typed, it updates the state.
                        // Using ES6, it knows to update the email key with this value of the same name.
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        placeholder='password'
                        label='Password'
                        // Simply having this key makes this a value of true
                        secureTextField
                        // TEXT STEP3 - Text is updated onLoginSuccess() {
                        value={this.state.password}
                        // TEXT STEP1 - When text is typed, it updates the state.
                        // Using ES6, it knows to update the password key with this value of the same name.
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                
                <Text style={styles.errorTextStyle}>
                    {/* Not visible when there are no errors */}
                    {this.state.error}
                </Text>

                <CardSection>
                    {/* Helper method that returns JSX, displays Log In button or Loading Spinner */}
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;