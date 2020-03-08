import React from 'react';
import Chart from "react-apexcharts";



interface IProps {
    series: any;
    dates: any;
}

// const options = {
                
//     chart: {
//         id: "basic-line"
//     },
//     xaxis: {
//         categories: this.props.dates,
//     }
// };
            

class LightGraph extends React.Component<IProps, {}> {


  

    render():  JSX.Element {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart" style = {{width:"100%"}}>
                        <Chart
                            options={{
                                yaxis: {
                                    min: 0,
                                },
                                colors: ["#FF9E00"],
                                chart: {
                                    id: "basic-line"
                                },
                                xaxis: {
                                    categories: this.props.dates,
                                }
                            }}
                            
                            series={this.props.series}
                            type="line"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LightGraph;