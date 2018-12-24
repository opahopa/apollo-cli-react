import React from 'react';
import NavBar from '../components/NavBar';
import {ApolloProvider} from 'react-apollo';
import {Client} from '../config/ApolloClient';
import { BrowserRouter as Router} from "react-router-dom";
import {render} from "react-testing-library";
import App from "../App";


const setup = () => {
    return render(
        <ApolloProvider client={Client}>
            <Router>
                <NavBar/>
            </Router>
        </ApolloProvider>,
    );
};


it('renders without error', () => {
    setup();
});

it('renders default username', () => {
    const {getByTestId} = render(<App/>);
    const defaultUsername = getByTestId("username-value");
    expect(defaultUsername).toHaveTextContent('default');
});