import React from 'react';
import renderer from 'react-test-renderer';
import MemberManager from '../components/MemberManager';
import {IMember} from '../types';
import MenuBar from '../components/MenuBar';
import DashTabs from '../components/Dashboard/DashTabs';
import MapEditor from '../pages/map-editor';

console.error = jest.fn();
const members: Array<IMember> = [
    { "memberId": 2, "userId": 1, "firstName": "Mocked 2", "lastName": "Member", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 3, "userId": 1, "firstName": "Mocked 3", "lastName": "Member", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 4, "userId": 1, "firstName": "Mocked 4", "lastName": "Member", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 5, "userId": 1, "firstName": "Mocked 5", "lastName": "Member", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 6, "userId": 1, "firstName": "Mocked 6", "lastName": "Member", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 7, "userId": 1, "firstName": "Mocked 7", "lastName": "Member", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 8, "userId": 1, "firstName": "Mocked 8", "lastName": "Member", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 9, "userId": 1, "firstName": "Mocked 9", "lastName": "Member", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 10, "userId": 1, "firstName": "Mocked 10", "lastName": "Member", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 11, "userId": 1, "firstName": "Meme", "lastName": "Lad", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 12, "userId": 1, "firstName": "Meme", "lastName": "Lad2", "createdAt": 1582032319, "lastUpdated": 1582032319 },
    { "memberId": 13, "userId": 1, "firstName": "Meme", "lastName": "Lad3", "createdAt": 1582032319, "lastUpdated": 1582032319 }
];

describe('Member Manager Snapshot Test', () => {
    test('Snapshot Renders', () => {
        const component = renderer.create(<MemberManager userID={1} members={members} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

function setDarkMode(): void {
    console.log('dark mode');
}

describe('MenuBar Snapshot Test', () => {
    test('Snapshot Renders', () => {
        const component = renderer.create(<MenuBar setDarkMode={setDarkMode}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('DashTabs Snapshot Test', () => {
    test('Snapshot Renders', () => {
        const component = renderer.create(<DashTabs userID={1} zoneData={[]} locationData={[]} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Map Editor Snapshot Test', () => {
    test('Snapshot Renders', () => {
        const component = renderer.create(<MapEditor userID={1}  />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
