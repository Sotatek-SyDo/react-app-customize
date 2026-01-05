import { AppButton } from '@/components/atoms/AppButton';
import { useNavigate } from 'react-router-dom';

/**
 * Custom Button for Medix client
 * Override logo and styling, maintain original structure
 */
const CustomMedix = () => {
  const navigate = useNavigate();
  return (
    <AppButton
      href='#'
      type='link'
      className='logo'
      style={{ color: '#fa4fe4', border: '1px solid #fa4fe4' }}
      onClick={() => navigate('/')}
    >
      Test Medix
    </AppButton>
  );
};

export default CustomMedix;
