import MemberUser from "../components/MemberUser/index";

const User = new MemberUser({ memberID: 1, members:[] });


it('Set User ID', () => {
    expect(User.props.memberID).toEqual(1);
});

it('Format AMPM', () => {
    expect(User.formatAMPM(new Date(1608854400000))).toEqual("12:00am"); // christmas day 2020 12:00am
    expect(User.formatAMPM(new Date(1608897600000))).toEqual("12:00pm"); // christmas day 2020 12:00pm
});

it('Determine Consent Terms', () => {
    
    const type = "Terms";
    const termsForm = "Test Response Terms";
    const privacyForm = "Test Response Privacy";
    const consentForm = "Test Response Consent";

    expect(User.decideConsentCalc(type, termsForm, privacyForm, consentForm)).toEqual("Test Response Terms");
});

it('Determine Consent Privacy', () => {

    const type = "Privacy";
    const termsForm = "Test Response Terms";
    const privacyForm = "Test Response Privacy";
    const consentForm = "Test Response Consent";

    expect(User.decideConsentCalc(type, termsForm, privacyForm, consentForm)).toEqual("Test Response Privacy");
});

it('Determine Consent Consent', () => {

    const type = "Consent";
    const termsForm = "Test Response Terms";
    const privacyForm = "Test Response Privacy";
    const consentForm = "Test Response Consent";

    expect(User.decideConsentCalc(type, termsForm, privacyForm, consentForm)).toEqual("Test Response Consent");
});

it('Determine Consent Error', () => {


    const termsForm = "Test Response Terms";
    const privacyForm = "Test Response Privacy";
    const consentForm = "Test Response Consent";

    expect(User.decideConsentCalc("Cons0ent", termsForm, privacyForm, consentForm)).toEqual("ERROR");
    expect(User.decideConsentCalc("", termsForm, privacyForm, consentForm)).toEqual("ERROR");
    expect(User.decideConsentCalc("4461451456456123", termsForm, privacyForm, consentForm)).toEqual("ERROR");
    expect(User.decideConsentCalc("fkajwekfjklwajlfkj", termsForm, privacyForm, consentForm)).toEqual("ERROR");
});
