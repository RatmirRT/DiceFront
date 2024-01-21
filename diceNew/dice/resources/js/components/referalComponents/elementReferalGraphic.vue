
<template>
    <div class="referal_tab_graphics">
        <div class="referal_tab_graphics-tabs">
            <button class="active">Неделя</button>
            <button>Месяц</button>
        </div>
        <div class="referal_tab_graphics-box">
            <Line
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                height="100%"
            />
        </div>
    </div>
</template>

<script>

import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
ChartJS.register(Tooltip, CategoryScale, LinearScale, PointElement, LineElement )

export default {
    components: { Line },
    data() {
        return {
            chartData: {
                labels: [ '06.10', '06.10', '06.10', '06.10', '06.10', '06.10', '06.10', ],
                datasets: [
                    {
                        data: [20, 10, 20, 60, 30, 30, 40],
                        cubicInterpolationMode: 'monotone',
                        borderColor: '#3566FB',
                        backgroundColor: '#fff',
                        color: '#FF0000FF',
                        borderWidth: 5,
                        pointRadius: 5,
                        pointBackgroundColor: '#3566FB',
                        pointBorderColor: '#3566FB',
                        pointHoverBackgroundColor: '#3566FB',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 4,
                        pointHoverRadius: 10,
                    }
                ],
            },
            chartOptions: {
                responsive: true,
                borderColor: 'red',
                scales: {
                    x: {
                        border: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(92, 107, 120, 0.40)',
                            font: {
                                size: 14,
                                family: 'Montserrat',
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(92, 107, 120, 0.10)',
                        }
                    },
                    y: {
                        beginAtZero: true,
                        border: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(92, 107, 120, 0.40)',
                            font: {
                                size: 14,
                                family: 'Montserrat',
                                weight: 'bold'
                            },
                        },
                        grid: {
                            display: false
                        }
                    }
                },
            },
        }
    }
}

</script>
