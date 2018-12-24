import React from 'react';
import SignIn from '../pages/SignIn';
import {render} from 'react-testing-library'
import ReactDOM from "react-dom";
import {ApolloProvider} from 'react-apollo';
import {Client} from '../config/ApolloClient';


// beforeEach(() => {
//     let { getByText } = render(<ApolloProvider client={Client}><SignIn/></ApolloProvider>);
// });
const setup = () => {
    return render(<ApolloProvider client={Client}><SignIn/></ApolloProvider>);
};

describe('SignIn', () => {

    it('renders without crashing', () => {
        setup();
    });

    it('renders username input', () => {
        const {getByTestId} = setup();
        const usernameInput = getByTestId("username-input");
        expect(usernameInput).toBeInTheDocument();
    });

    it('renders submit button', () => {
        const {getByTestId} = setup();
        const submitBtn = getByTestId("btn-submit");
        expect(submitBtn).toBeInTheDocument();
    });
});
