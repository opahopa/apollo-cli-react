import React from 'react';
import App from '../App';
import {render} from 'react-testing-library'
import ReactDOM from "react-dom";
import { mount } from 'enzyme';


//FIXME: 'updates default username on for submit click' test works only with enzyme.
//username value is not updated using `react-testing-library`.
describe('App', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });


    it('updates default username on for submit click', async () => {
        const username = 'hello';

        const component = mount(<App/>);

        const input = component.find('input#username');
        input.instance().value = username;
        input.simulate('change', input);

        expect(input.instance().value).toBe(username);

        component.find('button#btn-submit').simulate('click');
        setTimeout(()=>{
            const usernameValue = component.find('#value-username-id');
            expect(usernameValue).toHaveTextContent(username);
        },1);
    });


    // it('updates default username on for submit click', async () => {
    //     const username = 'hello';
    //
    //     const {getByTestId, container, rerender} = render(<App/>);
    //
    //     //subscribe to DOM changes
    //     // const container = document.getElementsByTagName('AppBar');
    //     // console.log(typeof container);
    //     // await waitForDomChange({container}).then(() => {
    //     //     const defaultUsername = getByTestId("username-value");
    //     //     expect(defaultUsername).toHaveTextContent(username);
    //     // });
    //
    //     //set username
    //     const usernameInput = getByTestId("username-input");
    //     usernameInput.value = username;
    //     expect(usernameInput.value).toBe(username);
    //
    //     const submitBtn = getByTestId("btn-submit");
    //     // console.log(prettyDOM(submitBtn));
    //     fireEvent.click(submitBtn, {button: 0});
    //
    //     const defaultUsername = getByTestId("username-value");
    //     // expect(defaultUsername).toHaveTextContent(username);
    // });

});
