// Import React and React-Native
import React, { Component } from 'react';
import { View } from 'react-native';
// Import packages
import firebase from 'firebase';
import firebaseConfig from '../firebase.config';
// Import components
import { Button, CardSection, Header, LoadingSpinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {

        console.log('firebaseConfig');
        console.log(firebaseConfig);

        firebase.initializeApp(firebaseConfig);

        // Monitors firebase authentication state changes
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        // Check user authentication state
        switch (this.state.loggedIn) {
            // User is logged in, render content
            case true:
                return (
                    <CardSection>
                        <Button onPressFunction={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            // User is not logged in, show login form
            case false:
                return <LoginForm />;
            // Checking user authentication status
            default:
                return (
                    <CardSection>
                        <LoadingSpinner size="large" />
                    </CardSection>
                );
        }
    }
    
    render() {
        return (
            <View>
                <Header headerText='Authentication' />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
