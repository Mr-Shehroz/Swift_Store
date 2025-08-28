// app/verifyemail/page.tsx
import { Suspense } from 'react';
import VerifyEmailClient from './VerifyEmailClient';

function VerifyEmailContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}

export default VerifyEmailContent;