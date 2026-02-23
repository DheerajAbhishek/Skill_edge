import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './VisualizationCharts.css';

const VisualizationCharts = ({ skills, recommendedSkills, detectedSkills, scoreData }) => {
    // Skills match data for pie chart
    const matchingSkills = recommendedSkills.filter(skill =>
        detectedSkills.some(ds => ds.toLowerCase().includes(skill.toLowerCase()))
    );
    const missingSkills = recommendedSkills.filter(skill =>
        !detectedSkills.some(ds => ds.toLowerCase().includes(skill.toLowerCase()))
    );

    const skillsPieData = [
        { name: 'Matched', value: matchingSkills.length, color: '#30D158' },
        { name: 'To Learn', value: missingSkills.length, color: '#FF453A' }
    ];

    // Score sections data for bar chart
    const scoreBarData = scoreData.sections
        .filter(s => s.points > 0)
        .map(section => ({
            name: section.name.replace('/', '/\n'),
            earned: section.hasIt ? section.points : 0,
            max: section.points,
            hasIt: section.hasIt
        }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{payload[0].payload.name}</p>
                    <p className="tooltip-value">
                        {payload[0].value} points
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="section">
            <div className="section-heading-wrapper">
                <div className="section-heading">
                    <h2>Visual Analytics</h2>
                </div>
            </div>

            <div className="charts-grid">
                {/* Skills Gap Pie Chart */}
                <div className="chart-card card">
                    <h3>Skills Gap Analysis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={skillsPieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {skillsPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: '#1C1C1E',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#FFFFFF'
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ color: '#FFFFFF' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Score Breakdown Bar Chart */}
                <div className="chart-card card">
                    <h3>Section Scores</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={scoreBarData}>
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#F2F2F7', fontSize: 11 }}
                                angle={-20}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis tick={{ fill: '#F2F2F7' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="earned" fill="#0A84FF" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default VisualizationCharts;
