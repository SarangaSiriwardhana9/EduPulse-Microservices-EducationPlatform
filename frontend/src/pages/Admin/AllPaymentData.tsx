import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllPaymentData = () => {
  const [payments, setPayments] = useState([]);
  const [sortedPayments, setSortedPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refundLoading, setRefundLoading] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get('http://localhost:7072/api/paymentMangement/all', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:` Bearer ${token}`,
          },
        });
        const payments = response.data.map(payment => ({
          ...payment,
          date: new Date(payment.date)
        }));
        setPayments(payments);
        setSortedPayments(payments);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch payment data');
        setLoading(false);
      }
    };
    fetchPaymentData();
  }, []);

  console.log(payments);

  const sortPaymentsByDate = (option) => {
    let sortedData = [...payments];
    switch (option) {
      case 'latest':
        sortedData.sort((a, b) => b.date - a.date);
        break;
      case 'oldest':
        sortedData.sort((a, b) => a.date - b.date);
        break;
      case 'today':
        sortedData = sortedData.filter((payment) => isToday(payment.date));
        break;
      case 'thisWeek':
        sortedData = sortedData.filter((payment) => isThisWeek(payment.date));
        break;
      default:
        break;
    }
    setSortedPayments(sortedData);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const isThisWeek = (date) => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    return date >= firstDayOfWeek;
  };

  const handleRefund = async (userId, transactionId) => {
    console.log('Refunding transaction:', transactionId);
    console.log('Refunding user:', userId);
    console.log('Refunding token:', token);
  
    setRefundLoading(transactionId);
    
    try {
      const response = await axios.delete('http://localhost:7072/api/paymentMangement/saveTansaction/cancel', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { userId, transactionId }, // Include userId and transactionId in the request body
      });
  
      if (response.data.message === "Refund processed successfully") {
        const updatedPayments = payments.map(payment =>
          payment.transactionId === transactionId
            ? { ...payment, status: "refunded" }
            : payment
        );
        setPayments(updatedPayments);
        setSortedPayments(updatedPayments);
  
        // Display success toast
        toast.success("Refund processed successfully");
      }
    } catch (error) {
      console.error("Failed to process refund:", error);
      // Display error toast
      toast.error("Failed to process refund");
    } finally {
      setRefundLoading(null);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Payment Data</h1>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => sortPaymentsByDate('latest')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Latest</button>
        <button onClick={() => sortPaymentsByDate('oldest')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Oldest</button>
        <button onClick={() => sortPaymentsByDate('today')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Today</button>
        <button onClick={() => sortPaymentsByDate('thisWeek')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">This Week</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {sortedPayments.map((payment) => (
  <tr key={payment.transactionId}>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.courseId ? payment.courseId.name : 'N/A'}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><img src={payment.courseId ? payment.courseId.img : ''} alt={payment.courseId ? payment.courseId.name : ''} className="h-10 w-10 object-cover" /></td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.transactionId}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.userId ? `${payment.userId.firstName} ${payment.userId.lastName}` : 'N/A'}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.userId ? payment.userId.email : 'N/A'}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount / 100}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.status}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {payment.status !== 'refunded' ? (
        <button
          onClick={() => handleRefund(payment.userId._id, payment.transactionId)}
          disabled={refundLoading === payment.transactionId}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        >
          {refundLoading === payment.transactionId ? 'Processing...' : 'Refund'}
        </button>
      ) : (
        'Refunded'
      )}
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
      <ToastContainer />

    </div>
  );
};

export default AllPaymentData;
