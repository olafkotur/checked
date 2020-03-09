import MemberManager from "../components/MemberManager/index";



const Manager = new MemberManager({userID: 1});

it('Set User ID', () => {
    expect(Manager.props.userID).toEqual(1);
});

