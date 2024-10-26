import React, { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

import { STORAGE_KEY } from 'src/auth/context/jwt/constant';

export function CustomerRegistrationForm({ incomingData }) {
  const [formData, setFormData] = useState({
    customerFirstName: '',
    customerLastName: '',
    phoneNumber: '',
    emailAddress: '',
    address: '',
    productName: '',
    faultDescription: '',
    faultDate: '',
    servicePersonnel: '',
    warrantyStatus: '',
    cargoStatus: '',
    serviceCompletionStatus: '',
    operationDate: '',
    deliveryDate: '',
    notes: '',
  });

  const [responseData, setResponseData] = useState(null);
  const accessToken = sessionStorage.getItem(STORAGE_KEY);

  useEffect(() => {
    if (incomingData) {
      setFormData(incomingData); // Web sitesinden gelen verileri set ediyor
    }
  }, [incomingData]);

  const postData = useCallback(async (data) => {
    try {
      const response = await fetch('https://customer.boostergin.com/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseData(result);
      } else {
        alert('Müşteri kaydedilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Müşteri kaydedilirken bir hata oluştu.');
    }
  }, [accessToken]); // Add accessToken as a dependency

  useEffect(() => {
    if (Object.values(formData).some(field => field)) {
      postData(formData);
    }
  }, [formData, postData]); // Include postData in the dependency array

  return (
    <Card sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <h2>Müşteri Bilgileri</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre> {/* Önceki verileri görüntülemek için */}
      {responseData && (
        <div>
          <h3>Müşteri Başarıyla Kaydedildi!</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      <p>Veriler otomatik olarak kaydediliyor...</p>
    </Card>
  );
}

