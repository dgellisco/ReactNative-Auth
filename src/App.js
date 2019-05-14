// MAIN APP

// DEPENDENCIES
// Import React and React-Native
import React, { Component } from 'react';
import { View } from 'react-native';
// Import firebase
import firebase from 'firebase';
import firebaseConfig from '../firebase.config';
// Import local components
import { Button, CardSection, Header, LoadingSpinner } from './components/common';
import LoginForm from './components/LoginForm';

// Create main
class App extends Component {
    // Set default login state to 'unknown'
    state = { loggedIn: null };

    componentWillMount() {
        // Connect to firebase
        firebase.initializeApp(firebaseConfig);

        // Monitor firebase authentication state changes
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    // Render content based on log in state
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
    
    // Render App
    render() {
        return (
            <View>
                {/* Always render header */}
                <Header headerText='Authentication' />
                {/* Render content based on authentication state */}
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
