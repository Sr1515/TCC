import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ChartContainer } from "./style";

interface Player {
  id: string;  
  name: string;
  score: number;
  stats: {
    teamwork: number;
    communication: number;
    timeManagement: number;
  };
}

interface SkillChartProps {
    players: Player[];
    skill: keyof Player | keyof Player["stats"];
}

const skillNamesPT: Record<string, string> = {
  score: "Pontuação Total",
  teamwork: "Trabalho em Equipe",
  communication: "Comunicação",
  timeManagement: "Gerenciamento de Tempo",
};


const SkillChart: React.FC<SkillChartProps> = ({ players, skill }) => {

    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current, undefined, { renderer: 'svg' });

        const getSkillValue = (player: Player, skill: string) => {
            if (skill === "score") return player.score;
            return player.stats[skill as keyof typeof player.stats];
        };

        const values = players.map(p => getSkillValue(p, skill as string));
        const maxValue = Math.max(...values);
        const yMax = Math.ceil(maxValue * 1.2);

        const option: echarts.EChartsOption = {
            title: {
                text: skillNamesPT[skill as string] || skill.toString(),
                textStyle: {
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#333"
                },
                left: "center",
                top: "0"
            },
            tooltip: {
                trigger: "axis",
                formatter: (params: any) => {
                    const value = params[0].value;
                    const player = params[0].axisValue;
                    return `${player}: ${value}`;
                }
            },
            xAxis: {
                type: "category",
                data: players.map(p => p.name),
                axisLabel: {
                    rotate: 30,
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#333",
                    overflow: "break", 
                    lineHeight: 18
                },
                axisLine: {
                    lineStyle: {
                        color: "#ccc"
                    }
                },
                axisTick: {
                    alignWithLabel: true
                }
            },
            yAxis: {
                type: "value",
                min: 0,
                max: yMax,
                interval: Math.ceil(yMax / 5),
                axisLabel: {
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#333",
                    formatter: (value: number) => `${Math.floor(value)}`
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ccc"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                }
            },
            series: [
                {
                    name: skill.toString(),
                    type: "bar",
                    data: values,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#5470C6" },
                            { offset: 0.5, color: "#3A56B4" },
                            { offset: 1, color: "#1E3A8A" }
                        ]),
                        borderRadius: [4, 4, 0, 0]
                    },
                    label: {
                        show: true,
                        position: "top",
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#333",
                        formatter: (params: any) => `${params.value}`
                    },
                    barWidth: players.length > 10 ? "50%" : "20%",
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }
            ],
            grid: {
                containLabel: true,
                left: "5%",
                right: "5%",
                bottom: "30%",
                top: "15%"
            },

        };

        chart.setOption(option);

        const resizeHandler = () => chart.resize();
        window.addEventListener("resize", resizeHandler);

        return () => {
            chart.dispose();
            window.removeEventListener("resize", resizeHandler);
        };


    }, [players, skill]);

    return <ChartContainer ref={chartRef} />;
};

export default SkillChart;