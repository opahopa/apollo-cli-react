import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {Client} from '../config/ApolloClient';
import {render, waitForDomChange, waitForElement} from "react-testing-library";
import AppCampaigns from "../pages/Campaigns";


const setup = () => {
    return render(
        <ApolloProvider client={Client}>
            <AppCampaigns/>
        </ApolloProvider>,
    );
};


//TODO: replace campaigns data with mocks
it('renders without error', () => {
    setup();
});

it('shows loading state', () => {
    const { getAllByText } = setup();
    const loadingTexts = getAllByText("Loading...");
    expect(loadingTexts.length > 0).toBe(true);
});

it('fetches one campaign', async () => {
    const {  getByTestId } = setup();

    await waitForElement(() => getByTestId("campaign-one"));
    const campaign = getByTestId("campaign-one");
    expect(campaign !== undefined).toBe(true);
});

it('fetches campaigns', async () => {
    const { getAllByTestId } = setup();

    await waitForElement(() => getAllByTestId("campaigns-row"));
    const campaigns = getAllByTestId("campaigns-row");
    expect(campaigns.length > 0).toBe(true);
});