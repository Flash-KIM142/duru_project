// 모아보기 기능의 data table 컴포넌트
import React, { useState, useEffect } from 'react';
import ReportDataServiceNorth from '../../../services/reportService';
import '../../../index.css';

const DateTable = ({ dateFrom, dateTo }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let reports = [];
        let start = new Date(dateFrom + 'T00:00:00'.replace(/-/g, "/"));
        let end = new Date(dateTo + 'T23:59:59'.replace(/-/g, "/"));
        console.log(start);
        console.log(end);

        ReportDataServiceNorth.getAll().where('date', '>=', start).where('date', '<=', end).get().then((documentSnapshots)=>{
            documentSnapshots.forEach((doc)=>{
                let temp = doc.data();
                let id = doc.id;
                let date = temp.date.toDate();

                reports.push({
                    name: temp.name,
                    description: temp.description,
                    year: date.getFullYear(),
                    month: date.getMonth()+1,
                    date: date.getDate(),
                    id: id,
                })
            })
            console.log(reports);
            setData(reports);
        })
    }, [])

    return (
        <>
            <table style={{ margin: "15px", }}>
                <tbody style={{ marginTop: "10px", }}>
                    {data && data.map((value, key)=>(
                        <>
                        <tr key={key}>
                            <td style={{ fontWeight: "bold", fontSize: "20px", paddingLeft: "10px", }}>{value.name}</td>
                        </tr>
                        <tr key={key} style={{ whiteSpace: "pre-line", }}>
                            <div class="dateCollectionDescription">
                                <td>{value.description}</td>
                            </div>
                        </tr>
                        <br/>
                        </>
                    ))}
                </tbody>
            </table>
        </>
    );
} 

export default DateTable;