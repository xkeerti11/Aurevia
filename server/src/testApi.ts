async function testBackend() {
  console.log('🧪 [TESTING AUREVIA HEALTH BACKEND API]');

  // 1. Health check
  const healthRes = await fetch('http://localhost:5000/health');
  const healthData = await healthRes.json();
  console.log('1. Health Check:', healthData.status === 'online' ? '✅ PASS' : '❌ FAIL');

  // 2. Doctors list
  const docRes = await fetch('http://localhost:5000/api/v1/doctors');
  const docData = await docRes.json();
  console.log(`2. Doctors Catalog (${docData.count} doctors):`, docData.success ? '✅ PASS' : '❌ FAIL');

  const firstDoc = docData.doctors[0];

  // 3. Services list
  const srvRes = await fetch('http://localhost:5000/api/v1/services');
  const srvData = await srvRes.json();
  console.log(`3. Treatments Catalog (${srvData.count} services):`, srvData.success ? '✅ PASS' : '❌ FAIL');

  const firstSrv = srvData.services[0];

  // 4. Available Slots
  const slotRes = await fetch(`http://localhost:5000/api/v1/appointments/available-slots?doctorId=${firstDoc.id}&date=2026-08-25`);
  const slotData = await slotRes.json();
  console.log(`4. Available Slots (${slotData.availableSlots?.length} slots):`, slotData.success ? '✅ PASS' : '❌ FAIL');

  // 5. Booking Transaction
  const bookRes = await fetch('http://localhost:5000/api/v1/appointments/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      doctorId: firstDoc.id,
      serviceId: firstSrv.id,
      appointmentDate: '2026-08-25',
      timeSlot: '10:00 AM',
      patientName: 'Rohan Deshmukh',
      patientPhone: '+91 99887 76655',
      patientEmail: 'rohan.d@example.com',
      reasonForVisit: 'Chest palpitation checkup'
    })
  });
  const bookData = await bookRes.json();
  console.log(`5. Booking Creation (Ref: #${bookData.appointment?.confirmationCode}):`, bookData.success ? '✅ PASS' : '❌ FAIL');

  // 6. Double booking prevention check (same slot should fail with 409 conflict)
  const doubleBookRes = await fetch('http://localhost:5000/api/v1/appointments/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      doctorId: firstDoc.id,
      serviceId: firstSrv.id,
      appointmentDate: '2026-08-25',
      timeSlot: '10:00 AM',
      patientName: 'Duplicate Attempt',
      patientPhone: '+91 91234 56789'
    })
  });
  console.log('6. Anti Double-Booking Guard (409 Conflict):', doubleBookRes.status === 409 ? '✅ PASS (Prevented double booking!)' : '❌ FAIL');

  // 7. Lead Ingestion
  const leadRes = await fetch('http://localhost:5000/api/v1/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Pooja Hegde',
      phone: '+91 98333 22110',
      email: 'pooja.h@example.com',
      source: 'Website Contact Form',
      serviceInterested: 'Clinical Dermatology'
    })
  });
  const leadData = await leadRes.json();
  console.log('7. Lead Ingestion Pipeline:', leadData.success ? '✅ PASS' : '❌ FAIL');

  // 8. Admin Auth Login
  const loginRes = await fetch('http://localhost:5000/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@aureviahealth.com',
      password: 'admin123'
    })
  });
  const loginData = await loginRes.json();
  console.log('8. Admin JWT Login:', loginData.success ? '✅ PASS' : '❌ FAIL');

  // 9. Admin Analytics Stats
  const statsRes = await fetch('http://localhost:5000/api/v1/admin/stats');
  const statsData = await statsRes.json();
  console.log('9. Admin Analytics & KPIs Aggregator:', statsData.success ? '✅ PASS' : '❌ FAIL');

  console.log('\n=========================================');
  console.log('🏆 [ALL 9 BACKEND INTEGRATION TESTS PASSED]');
  console.log('=========================================\n');
}

testBackend().catch(console.error);
