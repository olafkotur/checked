import React from 'react';
import Chart from "react-apexcharts";
import { Height } from '@material-ui/icons';



interface IProps {
    series: any;
    dates: any;
    height: string;
}

            

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
                                    id: "basic-line",
                                    foreColor: '#656565'
                                },
                                xaxis: {
                                    categories: this.props.dates,
                                }
                                
                               
                            }}
                            height={this.props.height}
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