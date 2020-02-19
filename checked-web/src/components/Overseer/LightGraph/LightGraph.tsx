import React from 'react';
import Chart from "react-apexcharts";



interface IProps {
    series: any;
}

const options = {
                
    chart: {
        id: "basic-line"
    },
    // xaxis: {
    //     // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    // }
}
            

class LightGraph extends React.Component<IProps, {}> {


  

    render():  JSX.Element {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={options}
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