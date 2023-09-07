import './reports.scss';
import { BarChart, DoughnutChart } from './report_charts';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState, useEffect } from "react";

function Report_Overview() {


    const { data: reportsData, isLoading, isError } = useQuery(
        ["reportsData"],
        async () => {
            const response = await makeRequest.get(`/reports/todayP`);
            return response.data;
        }
    );


    return (
        <div className="reports_overview">
            <div className="reports_summary">
                <div className="summary_card">
                    <p>Post Reports Today
                        <br />
                        {reportsData && (
                            <span>{reportsData[0]?.count}</span>
                        )}
                    </p>
                </div>
                <div className="summary_card">
                    <p>User Reports Today
                        <br />
                        <span>35</span>

                    </p>
                </div>
                <div className="summary_card">
                    <p>Ongoing Post Reports
                        <br />
                        <span>35</span>
                    </p>
                </div>
                <div className="summary_card">
                    <p>Ongoing User Reports
                        <br />
                        <span>35</span>
                    </p>
                </div>
            </div>
            <div className="chart_container">
                <div className="chart">
                    <h2>Report Analytics - By Type</h2>
                    <BarChart />
                </div>
                <div className="chart">
                    <h2>Report Analytics - By Severity</h2>
                    <DoughnutChart />
                </div>
            </div>
        </div>
    );
}

export default Report_Overview;