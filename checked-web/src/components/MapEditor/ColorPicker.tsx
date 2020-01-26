import React from 'react';


import "./CSS/Editor.css";




class ColorPicker extends React.Component {


    test = () => {
        console.log("testWorks");
    };

    render () {
        return (
            <div className="blockContainer">
                <div className="colorPickerContainer" >
                    <div className="colorSquare" id="varient1"></div>
                    <div className="colorSquare" id="varient2"></div>
                    <div className="colorSquare" id="varient3"></div>
                    <div className="colorSquare" id="varient4"></div>

                    <div className="colorSquare" id="varient5"></div>
                    <div className="colorSquare" id="varient6"></div>
                    <div className="colorSquare" id="varient7"></div>
                    <div className="colorSquare" id="varient8"></div>

                    <div className="colorSquare" id="varient9"></div>
                    <div className="colorSquare" id="varient10"></div>
                    <div className="colorSquare" id="varient11"></div>
                    <div className="colorSquare" id="varient12"></div>

                    <div className="colorSquare" id="varient13"></div>
                    <div className="colorSquare" id="varient14"></div>
                    <div className="colorSquare" id="varient15"></div>
                    <div className="colorSquare" id="varient16"></div>

                </div>

            </div>
        );
    }
};


export default ColorPicker;