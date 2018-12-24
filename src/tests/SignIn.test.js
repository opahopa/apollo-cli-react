import React from 'react';
import SignIn from '../pages/SignIn';
import {render} from 'react-testing-library'
import {mount} from 'enzyme';
import {ApolloProvider} from 'react-apollo';
import {Client} from '../config/ApolloClient';

const setup = () => {
    return render(<ApolloProvider client={Client}><SignIn/></ApolloProvider>);
};

//TODO: figure out why username unput change event doesn't get fired with 'react-testing-library'
// (related to use of react material)
describe('SignIn', () => {

    it('renders without crashing', () => {
        setup();
    });

    it('renders username input', () => {
        const {getByTestId} = setup();
        const usernameInput = getByTestId("input-username");
        expect(usernameInput).toBeInTheDocument();
    });

    it('renders submit button', () => {
        const {getByTestId} = setup();
        const submitBtn = getByTestId("btn-submit");
        expect(submitBtn).toBeInTheDocument();
    });

    it('shows minlength error', () => {
        const component = mount(<ApolloProvider client={Client}><SignIn/></ApolloProvider>);

        const input = component.find('input#username');
        input.instance().value = '12';
        input.simulate('change', input);

        const errorMsg = component.find('#form-error-msg');
        expect(errorMsg.text().includes('minLength')).toBe(true);
    });

    it('shows maxlength error', () => {
        const component = mount(<ApolloProvider client={Client}><SignIn/></ApolloProvider>);

        const input = component.find('input#username');
        input.instance().value = '111111111111111111111111111111111111111111111';
        input.simulate('change', input);

        const errorMsg = component.find('#form-error-msg');
        expect(errorMsg.text().includes('maxLength')).toBe(true);
    });
});
