




import React from 'react';


export const CustomTooltip = ({ active, payload, label }: any) => {

    if (active && payload && payload.length) {
        const date = new Date(label);
        const formattedDate = date.toISOString().replace('T', ' ').substring(0, 19);
        const weight = payload[0].value;

        return (
            <div style={{
                backgroundColor: 'var(--color-surface-alt)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--color-text)',
                fontSize: '14px',
                padding: '10px',
                boxShadow: 'var(--default-box-shadow)',
            }}>
                <p>{formattedDate}</p>
                <p>{weight} kg</p>
            </div>
        );
    }

    return null;
};
