import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

export default function Payment() {
  const { id, price, userId } = useParams<{ id: string; userId: string }>();
  const [courseData, setCourseData] = useState<any>({});
  const [paymentData, setPaymentData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false); // State for checkout loading
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect to fetch course data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await fetch(`http://localhost:7071/api/courseManagement/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const courseData = await courseResponse.json();
        setCourseData(courseData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user?.id]);

  // useEffect to fetch logged-in user's payment data
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(`http://localhost:7072/api/paymentMangement/get-card?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch payment data');
        }
        const data = await response.json();
        setPaymentData(data);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };
    fetchPaymentData();
  }, [userId]);

  // Handle payment submission
  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setCheckoutLoading(true); // Set checkout loading to true when payment submission starts

      const paymentResponse = await fetch('http://localhost:7072/api/paymentMangement/saveTansaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId: user?.id,
          amount: price,
          courseId: id,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to save transaction');
      }

      const paymentData = await paymentResponse.json();

      const enrollResponse = await fetch('http://localhost:7071/api/courseManagement/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          courseId: id,
          userId: user?.id,
          transactionId: paymentData.data._id,
        }),
      });

      if (enrollResponse.ok) {
        toast.success('Successfully enrolled in the course');

        setTimeout(() => {
          navigate('/user-profile');
        }, 2000);
      } else {
        throw new Error('Failed to enroll in the course');
        toast.error('Failed to enroll in the course');
      }
    } catch (error) {
      console.error('Error handling payment:', error);
      toast.error('Error handling payment');
    } finally {
      setCheckoutLoading(false); // Set checkout loading to false when payment submission finishes
    }
  };

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <form className="flex py-16 justify-center max-w-3xl mx-auto" onSubmit={handlePayment}>
          {/* display Payment data */}
          <div className="flex-2 flex shadow-xl flex-col">
            <div className="border border-gray-300 p-4 mt-4">
              <h1 className="font-bold text-lg">Payment Method</h1>
              <div className="flex flex-col mt-4">
                <label htmlFor="cardName" className="font-bold mb-2">
                  Name on Card:
                </label>
                <input
                  type="text"
                  id="cardName"
                  className="px-3 py-2 border font-mono font-semibold text-gray-500 border-gray-300"
                  placeholder="Name on Card"
                  value={paymentData?.brand}
                  readOnly
                />
                <label htmlFor="cardNumber" className="font-bold mt-4 mb-2">
                  Card Number:
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="px-3 py-2 border font-mono font-semibold text-gray-500 border-gray-300"
                  placeholder="0000 0000 0000 0000"
                  value={`**** **** **** ${paymentData?.last4}`}
                  readOnly
                />
                <div className="flex">
                  <div className="flex-1 flex flex-col pr-2">
                    <label htmlFor="securityCode" className="font-bold mb-2">
                      Security Code:
                    </label>
                    <input
                      type="text"
                      id="securityCode"
                      className="px-3 py-2 border font-mono font-semibold text-gray-500 border-gray-300"
                      placeholder="Security code"
                      value="***"
                      readOnly
                    />
                  </div>
                  <div className="flex-1 flex flex-col pl-2">
                    <label htmlFor="expireDate" className="font-bold mb-2">
                      Expiration Date:
                    </label>
                    <input
                      type="text"
                      id="expireDate"
                      className="px-3 py-2 border font-mono font-semibold text-gray-500 border-gray-300"
                      placeholder="Expire Date"
                      value={`${paymentData?.exp_month}/${paymentData?.exp_year}`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 shadow-2xl flex flex-col justify-between p-4 border border-gray-300 mx-8 bg-blue-100">
            <div className="mb-4 ">
              <img
                src={courseData.img}
                alt={courseData.name}
                style={{ width: '100%', marginBottom: '8px', display: imageLoading ? 'none' : 'block' }}
                onLoad={() => setImageLoading(false)}
              />
              {imageLoading && <Loader />} {/* Render loader while image is loading */}
              <h2 className="font-mono text-xl font-semibold text-gray-700">{courseData.name}</h2>
              <p className="font-mono font-semibold text-gray-500">Discount: 0%</p>
            </div>
            <div className="mb-4">
              <p className="font-mono font-semibold text-red-500">Total: RS.{courseData.price}</p>
            </div>
            <div>
              <p>By continuing, you agree to the terms of service.</p>
            </div>
            <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 mt-4" type="submit" disabled={checkoutLoading}>
              {checkoutLoading ? 'Completing Checkout...' : 'Complete Checkout'} {/* Disable button and show loading text when checkout is in progress */}
            </button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}
