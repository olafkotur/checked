import {compareTwoRects} from '../components/MapEditor/collisionDetection';


it('Colision Was Detected Same Values', () => {

    const rect1 = {
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        bottom: 150,
        right: 150,
    };

    expect(compareTwoRects(rect1,rect1)).toBeTruthy();
});


it('Colision Was Detected Different Left', () => {
    const rect1Height = 150;
    const rect1Width = 150;
    const left = 50;


    const rect1 = {
        width: rect1Width,
        height: rect1Height,
        top: 0,
        left: left,
        bottom: rect1Height,
        right: left + rect1Width,
    };

    const rect2 = {
        width: rect1Height,
        height: rect1Height,
        top: 0,
        left: 0,
        bottom: rect1Height,
        right: rect1Width,
    };

    expect(compareTwoRects(rect1, rect2)).toBeTruthy();
});

it('Colision Was Detected Different Right', () => {
    const rect1Height = 150;
    const rect1Width = 150;
    const left = 0;
    const right = 50;


    const rect1 = {
        width: rect1Width,
        height: rect1Height,
        top: 0,
        left: left,
        bottom: rect1Height,
        right: right + left + rect1Width,
    };

    const rect2 = {
        width: rect1Height,
        height: rect1Height,
        top: 0,
        left: 0,
        bottom: rect1Height,
        right: rect1Width,
    };

    expect(compareTwoRects(rect1, rect2)).toBeTruthy();
});

it('Colision Was Detected Different Top', () => {
    const rect1Height = 150;
    const rect1Width = 150;
    const left = 0;
    const right = 0;
    const top = 50;


    const rect1 = {
        width: rect1Width * 2, // this rect is twice as wide as the other
        height: rect1Height,
        top: 0,
        left: left,
        bottom: rect1Height,
        right: right + left + rect1Width,
    };

    const rect2 = {
        width: rect1Height,
        height: rect1Height,
        top: top,
        left: 0,
        bottom: rect1Height + top,
        right: rect1Width,
    };

    expect(compareTwoRects(rect1, rect2)).toBeTruthy();
});

it('Colision Was Detected Different Bottom', () => {
    const rect1Height = 150;
    const rect1Width = 150;
    const left = 0;
    const right = 0;
    const top = 0;
    const Bottom = 50;


    const rect1 = {
        width: rect1Width * 2, // this rect is twice as wide as the other
        height: rect1Height,
        top: 0,
        left: left,
        bottom: rect1Height,
        right: right + left + rect1Width,
    };

    const rect2 = {
        width: rect1Height,
        height: rect1Height,
        top: Bottom - rect1Height,
        left: 0,
        bottom: rect1Height + top + Bottom,
        right: rect1Width,
    };

    expect(compareTwoRects(rect1, rect2)).toBeTruthy();
});

it('Colision Was Detected Different Height', () => {
    const rect1Height = 150;
    const rect1Width = 150;
    const left = 0;
    const right = 0;


    const rect1 = {
        width: rect1Width,
        height: rect1Height * 2, //this rectangle is double the height of the other
        top: 0,
        left: left,
        bottom: rect1Height,
        right: right + left + rect1Width,
    };

    const rect2 = {
        width: rect1Height,
        height: rect1Height,
        top: 0,
        left: 0,
        bottom: rect1Height,
        right: rect1Width,
    };

    expect(compareTwoRects(rect1, rect2)).toBeTruthy();
});

it('Colision Was Detected Different Width', () => {
    const rect1Height = 150;
    const rect1Width = 150;
    const left = 0;
    const right = 0;


    const rect1 = {
        width: rect1Width * 2, // this rect is twice as wide as the other
        height: rect1Height , 
        top: 0,
        left: left,
        bottom: rect1Height,
        right: right + left + rect1Width,
    };

    const rect2 = {
        width: rect1Height,
        height: rect1Height,
        top: 0,
        left: 0,
        bottom: rect1Height,
        right: rect1Width,
    };

    expect(compareTwoRects(rect1, rect2)).toBeTruthy();
});

it('Colision Was Detected Smaller Inside Center', () => {
    const rectHeight = 200;
    const rectWidth = 200;



    const rect1 = {
        width: rectWidth / 4, 
        height: rectHeight / 4,
        top: 75,
        left: 75,
        bottom: 125,
        right: 125,
    };

    const rect2 = {
        width: rectHeight,
        height: rectHeight,
        top: 0,
        left: 0,
        bottom: rectHeight,
        right: rectWidth,
    };

    expect(compareTwoRects(rect1, rect2)).toBeTruthy();
});

// NO colision detected ----------------------------------------------------------------------------------------------------------------------------------


it('Colision Not Detected Left', () => {

    const left = 400;

    const rect1 = {
        width: 150,
        height: 150,
        top: 0,
        left: left,
        bottom: 150,
        right: left + 150,
    };

    const rect2 = {
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        bottom: 150,
        right: 150,
    };

    expect(compareTwoRects(rect1, rect2)).toBeFalsy();
});

it('Colision Not Detected Right', () => {

    const right = 400;

    const rect1 = {
        width: 150,
        height: 150,
        top: 0,
        left: right - 150,
        bottom: 150,
        right: right,
    };

    const rect2 = {
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        bottom: 150,
        right: 150,
    };

    expect(compareTwoRects(rect1, rect2)).toBeFalsy();
});

it('Colision Not Detected Top', () => {

    const top = 400;

    const rect1 = {
        width: 150,
        height: 150,
        top: top,
        left: 0,
        bottom: top + 150,
        right: 0,
    };

    const rect2 = {
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        bottom: 150,
        right: 150,
    };

    expect(compareTwoRects(rect1, rect2)).toBeFalsy();
});

it('Colision Not Detected Bottom', () => {

    const Bottom = 400;

    const rect1 = {
        width: 150,
        height: 150,
        top: Bottom - 150,
        left: 0,
        bottom: Bottom,
        right: 150,
    };

    const rect2 = {
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        bottom: 150,
        right: 150,
    };

    expect(compareTwoRects(rect1, rect2)).toBeFalsy();
});

it('Colision Not Detected Side Right', () => {

    const Bottom = 400;

    const rect1 = {
        width: 150,
        height: 150,
        top: 0,
        left: 150,
        bottom: 150,
        right: 300,
    };

    const rect2 = {
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        bottom: 150,
        right: 150,
    };

    expect(compareTwoRects(rect1, rect2)).toBeFalsy();
});