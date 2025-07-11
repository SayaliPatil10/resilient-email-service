const emailStatusHistory = [];

export const logEmailStatus = ({ to, subject, providerUsed, status, retryCount }) => {
  emailStatusHistory.push({
    to,
    subject,
    providerUsed,
    status,
    retryCount,
    timestamp: new Date().toISOString(),
  });
};

export const getEmailStatusHistory = () => emailStatusHistory;
