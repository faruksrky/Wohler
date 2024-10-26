import React, { useState, useEffect } from 'react';

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

  const accessToken = sessionStorage.getItem(STORAGE_KEY);

  useEffect(() => {
    if (incomingData) {
      setFormData(incomingData); // Web sitesinden gelen verileri set ediyor
    }
  }, [incomingData]);

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch('https://customer.boostergin.com/api/service-requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        });

        console.log('Response:', response);

        if (response.ok) {
          alert('Müşteri başarıyla kaydedildi!');
        } else {
          alert('Müşteri kaydedilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Müşteri kaydedilirken bir hata oluştu.');
      }
    };

    if (formData.customerFirstName) {
      postData();
    }
  }, [formData, accessToken]);

  return (
    <Card sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <p>Veriler otomatik olarak kaydediliyor...</p>
    </Card>
  );
}
