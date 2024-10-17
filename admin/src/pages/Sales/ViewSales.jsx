import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autoTable plugin for table support
import './ViewSales.css';

const ViewSales = ({ url }) => {
    const [salesData, setSalesData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredSales, setFilteredSales] = useState([]);
    const [filterOption, setFilterOption] = useState('all'); // New state for filter option

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get(`${url}/api/order/list`);
                console.log(response.data); // Log the entire response
    
                if (response.data.success) {
                    const orders = response.data.data;
                    console.log(orders); // Log orders to check their content
                    console.log(orders.map(order => order.status)); // Log statuses
    
                    const sales = orders
                        .filter(order => order.status && order.status.toLowerCase() === 'delivered') // Check for null/undefined and case
                        .map(order => ({
                            id: order._id,
                            items: order.items,
                            amount: order.amount,
                            status: order.status,
                            date: new Date(order.date).toLocaleDateString(),
                            originalDate: new Date(order.date)
                        }));
    
                    console.log(sales); // Log the filtered sales to see the result
    
                    setSalesData(sales);
                    setFilteredSales(sales);
    
                    const total = sales.reduce((sum, sale) => sum + sale.amount, 0);
                    setTotalSales(total);
                } else {
                    toast.error("Error fetching sales data");
                }
            } catch (error) {
                console.error('Error fetching sales data:', error);
                toast.error("Error fetching sales data");
            }
        };
    
        fetchSalesData();
    }, [url]);
    
    

    const handleFilter = () => {
        
        let filtered = [...salesData];


        // Input Validation Testing for custom date range
        if (filterOption === 'custom') {
            if (!startDate || !endDate) {
                toast.error("Please correct the parameters and try again."); // Invalid parameters
                return; // Exit the function if inputs are invalid
            }

            const start = new Date(startDate);
            const end = new Date(endDate);

            // Check if start date is after end date
            if (start > end) {
                toast.error("Start date cannot be later than end date.");
                return; // Exit if invalid range
            }

            filtered = filtered.filter(sale => {
                const saleDate = sale.originalDate;
                return (
                    saleDate >= start && saleDate <= end
                );
            });
        } else if (filterOption === 'thisYear') {
            const currentYear = new Date().getFullYear();
            filtered = filtered.filter(sale => sale.originalDate.getFullYear() === currentYear);
        } else if (filterOption === 'thisMonth') {
            const currentMonth = new Date().getMonth();
            filtered = filtered.filter(sale => sale.originalDate.getMonth() === currentMonth);
        } else if (filterOption === 'thisWeek') {
            const today = new Date();
            const weekStart = today.getDate() - today.getDay();
            const weekEnd = weekStart + 6;
            filtered = filtered.filter(sale => {
                const saleDate = sale.originalDate.getDate();
                return saleDate >= weekStart && saleDate <= weekEnd;
            });
        }

        setFilteredSales(filtered);
        
        // Calculate total sales for filtered data
        const total = filtered.reduce((sum, sale) => sum + sale.amount, 0);
        setTotalSales(total);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Sales Report", 14, 22);
        doc.setFontSize(12);
        doc.text(`Total Sales: ₱${totalSales}`, 14, 30);

        const tableData = filteredSales.map(sale => [
            sale.items.map(item => `${item.name} x ${item.quantity}`).join(', '),
            `₱${sale.amount}`,
            sale.status,
            sale.date
        ]);

        doc.autoTable({
            head: [['Items Sold', 'Amount', 'Status', 'Date']],
            body: tableData,
            startY: 40,
        });

        doc.save("sales_report.pdf");

        // Functional Testing: Indicate success of report generation
        toast.success("Report generated and saved successfully."); // Successful report generation
    };

    const resetFilters = () => {
        setStartDate('');
        setEndDate('');
        setFilteredSales(salesData);
        setTotalSales(salesData.reduce((sum, sale) => sum + sale.amount, 0)); // Reset total sales
        setFilterOption('all'); // Reset filter option to default
    };

    return (
        <div className="view-sales">
            <h1>Sales Report</h1>
            <div className="date-filters">
                <label>
                    Filter By:
                    <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                        <option value="all">All</option>
                        <option value="thisYear">This Year</option>
                        <option value="thisMonth">This Month</option>
                        <option value="thisWeek">This Week</option>
                        <option value="custom">Custom Date Range</option>
                    </select>
                </label>
                {filterOption === 'custom' && (
                    <>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </label>
                        <label>
                            End Date:
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </label>
                    </>
                )}
                <button onClick={handleFilter}>Generate Report</button>
                <button onClick={resetFilters}>Reset Filters</button>
                <button onClick={exportToPDF}>Export to PDF</button>
            </div>
            <h2>Total Sales: ₱{totalSales}</h2> {/* Display total sales amount */}
            {filteredSales.length === 0 ? (
                <p>No sales data available for the selected dates.</p>
            ) : (
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>Items Sold</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map((sale) => (
                            <tr key={sale.id}>
                                <td>{sale.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}</td>
                                <td>₱{sale.amount}</td>
                                <td>{sale.status}</td>
                                <td>{sale.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewSales;
