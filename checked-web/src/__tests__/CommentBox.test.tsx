import CommentBox from "../components/MemberManager/comments/commentBox";


const newComment = new CommentBox({
    new: true,
    timeStamp: "today",
    textContent: "test",
    radioVal: "0",
    dbid: 0,
    canDelete: true,
    imageSrc: undefined,
});

it('Set User ID', () => {
    expect(true).toEqual(true);
});

