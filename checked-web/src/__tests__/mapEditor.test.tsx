
import MapEditor from "../pages/map-editor";

const editor = new MapEditor({
    userID: 1
});

it('Set User ID', () => {
    expect(editor.props.userID).toEqual(1);
});

it('Text Color White', () => {
    expect(editor.determineTextColor("#000000")).toEqual("#ffffff");
});

it('Text Color Black', () => {
    expect(editor.determineTextColor("#ffffff")).toEqual("#000000");
});
