import React from 'react';
import Chart from "react-apexcharts";



interface IProps {
    data: Array<any>;
    labels: Array<string>;
    name: string;
    minimumY: number;
    maximumY: number;
    width: string;
    height: string;
    yAxis?: string;
    type: string;
    unit?: string;
}

class TimeSeriesGraph extends React.Component<IProps, {}> {


    render(): JSX.Element {

        const themeGradient = {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: [
                    {
                        offset: 0.6,
                        color: '#6ecb59',
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: '#1565C0',
                        opacity: 50
                    },
                ],
            }
        };

        const tempGradient = {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: undefined,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: [
                    {
                        offset: 0.6,
                        color: '#e96443',
                        opacity: 100
                    },
                    {
                        offset: 100,
                        color: '#904e95',
                        opacity: 100
                    },
                ],
            }
        };

        const lightGradient = {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: [
                    {
                        offset: 0.6,
                        color: '#F2C94C',
                        opacity: 100
                    },
                    {
                        offset: 100,
                        color: '#F2994A',
                        opacity: 50
                    },
                ],
            }
        };

        const usersGradient = {
            type: 'gradient',
            gradient: {
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: [
                    {
                        offset: 0.6,
                        color: '#1CB5E0',
                        opacity: 100
                    },
                    {
                        offset: 100,
                        color: '#4545ad',
                        opacity: 50
                    },
                ],
            }
        };

        const getGradient = (): object => {

            let gradient: object = themeGradient;

            switch (this.props.type) {
                case 'temperature':
                    gradient = tempGradient;
                    break;
                case 'light':
                    gradient = lightGradient;
                    break;
                case 'users':
                    gradient = usersGradient;
                    break;
            }
            return gradient;
        };


        return (
            <div className="pr-5 pl-5">
                <Chart
                    options={{
                        chart: {
                            stacked: false,
                            zoom: {
                                type: 'x',
                                enabled: true,
                                autoScaleYaxis: false
                            },
                            toolbar: {
                                show: true,
                                tools: {
                                    download: false,
                                    selection: true,
                                    zoom: true,
                                    zoomin: true,
                                    zoomout: true,
                                    pan: true,
                                    reset: true || '<img src="/static/icons/reset.png" width="20">',
                                },
                                autoSelected: 'zoom'
                            },
                        },
                        plotOptions: {
                            line: {
                                curve: 'smooth',
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        tooltip: {
                            enabled: true,
                            marker: {
                                show: false,
                            },
                            x: {
                                show: false,
                                format: 'HH:mm dd MMM',
                            },
                            y: {
                                show: false,
                                title: {
                                    formatter: (seriesName: string): string => '',
                                },
                                formatter: (reading: any): any => reading + '' + (this.props.unit || '')
                            },
                        },
                        stroke: {
                            curve: 'smooth',
                        },
                        fill: getGradient(),
                        markers: {
                            size: 0,
                            colors: ['#34717C'],
                            strokeColors: '#fff',
                            strokeWidth: 2,
                        },
                        yaxis: {
                            title: {
                                text: this.props.yAxis || ''
                            },
                            min: this.props.minimumY,
                            max: this.props.maximumY,
                            forceNiceScale: true,
                            labels: {
                                style: {
                                    cssClass: 'chartLabel'
                                }
                            }
                        },
                        xaxis: {
                            type: 'datetime',
                            labels: {
                                style: {
                                    cssClass: 'chartLabel'
                                }
                            }
                        },
                        
                    }}
                    series={[{
                        data: this.props.data
                    }]}
                    type="line"
                    width={this.props.width}
                    height={this.props.height}
                />
            </div>
        );
    }
}

export default TimeSeriesGraph;