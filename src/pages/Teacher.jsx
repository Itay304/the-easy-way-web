import AuthPortal from '../components/AuthPortal.jsx';

export default function Teacher() {
  return (
    <AuthPortal
      role="teacher"
      title="כניסת מורים"
      roleLabel="ניהול הכיתות והתלמידים שלך במקום אחד."
      dashboardLabel="כניסה לממשק הניהול"
    />
  );
}
