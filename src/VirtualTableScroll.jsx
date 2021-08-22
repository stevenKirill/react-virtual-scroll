import React, { useState, useRef, useEffect } from 'react';
import classes from './virtualTable.module.css';

const VirtualTableScroll = ({
    headers,
    rows,
    visibleRows,
    rowHeight
}) => {
    const [range, setRange] = useState(0);
    const root = useRef(null);

    useEffect(() => {
        const { current } = root;
        current.addEventListener('scroll',handleScroll);
        return () => {
            current.removeEventListener('scroll',handleScroll);
        }
    },[]);

    const getTopBlockHight = () => {
        return range * rowHeight;
    };

    const getBottomBlockHeight = () => {
        return rowHeight * (rows.length - (range + visibleRows));
    };

    const handleScroll = (e) => {
        setRange(Math.floor(e.target.scrollTop / rowHeight))
    };

    const renderHeaders = () => {
        return headers.map((header,id) => {
            return <div key={header + id} className={classes.header}>{header}</div>
        });
    };

    const renderRows = () => {
        return rows.slice(range, range + visibleRows).map((row,idx) => {
            return (
                <tr
                    className={classes.row}
                    key={row.id}
                    style={{ height: rowHeight }}
                >
                    {Object.entries(row).map((cell) => {
                        const [key, value] = cell;
                        if (key === 'id') {
                            return null
                        } else {
                            return (
                                <td
                                    className={classes.cell}
                                    key={row.id + value}
                                >{key === 'name' ? `${value}-${idx + 1}` : value}
                                </td>
                            )
                        }
                    })}
                </tr>
            );
        });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.headers}>{renderHeaders()}</div>
            <div 
                style={{
                    height: rowHeight * visibleRows + 1,
                    overflow: 'auto' 
                }}
                ref={root}
            >
                <div style={{ height: getTopBlockHight() }}></div>
                <table className={classes.table}>
                    <tbody className={classes.rows}>{renderRows()}</tbody>
                </table>
                <div style={{ height: getBottomBlockHeight() }}></div>
            </div>
        </div>
    );
};

export default VirtualTableScroll
