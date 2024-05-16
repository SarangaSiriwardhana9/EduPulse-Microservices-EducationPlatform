import React, { useState, useEffect, useContext } from 'react';
import { Box, Text, Spinner, Flex, VStack } from '@chakra-ui/react';
import { UserContext } from '../../UserContext';

// Import card icons from a library like react-icons
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from 'react-icons/fa';

const ViewPaymentData = ({ userId, authToken }) => {
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const publishableKey = "pk_test_51PEpR3P8dDb7QY7tKrBzy4J2YxgLPMx8sa4GPNpGeuuI3ESshjyW1qXZAx3VHioialpcMMZuTE1kHTL4f5gAuYuf00MRP8Okqi";

  useEffect(() => {
    const fetchCardDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:7072/api/paymentMangement/get-card?userId=${userId}`, // Pass userId as query parameter
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch card details');
        }
        const data = await response.json();
        setCardDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [userId, authToken]);

  const renderCardIcon = () => {
    if (cardDetails && cardDetails.brand) {
      // Map card brand to respective icon
      switch (cardDetails.brand.toLowerCase()) {
        case 'visa':
          return <FaCcVisa />;
        case 'mastercard':
          return <FaCcMastercard />;
        case 'amex':
          return <FaCcAmex />;
        case 'discover':
          return <FaCcDiscover />;
        default:
          return null;
      }
    }
    return null;
  };

  const renderCardDigits = () => {
    if (cardDetails && cardDetails.last4) {
      // Mask all but the last 4 digits with asterisks
      const maskedDigits = '**** **** **** ' + cardDetails.last4;
      return maskedDigits;
    }
    return null;
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Card Details
      </Text>
      {loading ? (
        <Flex align="center">
          <Spinner mr="2" />
          <Text>Loading card details...</Text>
        </Flex>
      ) : error ? (
        <Text color="red.500">Error: {error}</Text>
      ) : cardDetails ? (
        <VStack spacing="4" align="start">
          <Flex align="start" className='space-x-2'>{renderCardIcon()} <Text>: {renderCardDigits()}</Text></Flex>
          
          {/* Add other card details here */}
          <Text>Expiry Date: {cardDetails.exp_month}/{cardDetails.exp_year}</Text>
        </VStack>
      ) : (
        <Text>No card details available.</Text>
      )}
    </Box>
  );
};

export default ViewPaymentData;
