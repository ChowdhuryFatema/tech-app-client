// import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import PropTypes from 'prop-types';

const AdminPieChart = ({reviews, users, products}) => {

    const data = [
        { name: 'products', value: products.length },
        { name: 'reviews', value: reviews.length },
        { name: 'users', value: users.length },
    ];

    const COLORS = [ '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    
    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend></Legend>
            </PieChart>
        </div>
    );
};

AdminPieChart.propTypes = {
    reviews: PropTypes.array,
    users: PropTypes.array,
    products: PropTypes.array,
}
export default AdminPieChart;