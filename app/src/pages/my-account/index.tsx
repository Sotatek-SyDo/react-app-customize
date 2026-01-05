import WrapperButton from '@/components/atoms/AppButton/WrapperButton';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>My Account – Default</h1>
      <p>CLIENT = {import.meta.env.VITE_CLIENT ?? 'default'}</p>
      <WrapperButton onClick={() => navigate('/')}>Button Default</WrapperButton>
    </div>
  );
};

export default MyAccount;
