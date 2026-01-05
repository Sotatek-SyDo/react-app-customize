import { AppButton } from '@/components/atoms/AppButton';
import { useNavigate } from 'react-router-dom';


/**
 * Custom Header for Hitowa client (Note: File name is CustomButton but comment said CustomHeader previously)
 * Override logo and styling, maintain original structure
 */
const CustomButton = () => {
  const navigate = useNavigate();
  return (
    <AppButton
      href='#'
      type='link'
      className='logo'
      style={{ color: '#FF6B35', border: '1px solid #ff6b35' }}
      onClick={() => navigate('/')}
    >
      Hitowa Button custom
    </AppButton>
  );
};

export default CustomButton;