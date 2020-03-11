import MemberManager from "../components/MemberManager/index";



const Manager = new MemberManager({ userID: 1 });

it('Set User ID', () => {
    expect(Manager.props.userID).toEqual(1);
});


it('Format AMPM', () => {
    expect(Manager.formatAMPM(new Date(1608854400000))).toEqual("12:00am"); // christmas day 2020 12:00am
    expect(Manager.formatAMPM(new Date(1608897600000))).toEqual("12:00pm"); // christmas day 2020 12:00pm
  
});

