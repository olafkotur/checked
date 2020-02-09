import {checkCollision, compareTwoRects} from '../components/MapEditor/collisionDetection';
import React from 'react';

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