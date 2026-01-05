import { AppButton } from '@/components/atoms/AppButton';
import { Avatar, Button, Flex, Row } from 'antd';

/**
 * Custom Header for Hitowa client
 * Override logo and styling, maintain original structure
 */
const CustomHeader = () => {
  return (
    <div
      id='header'
      style={{
        background: '#d4cca7',
      }}
    >
      <div className='container'>
        <Flex justify='between' className='header-wrap'>
          <Row className='nav'>
            <Button
              href='#'
              type='link'
              className='logo'
              style={{ color: '#FF6B35' }}
            >
              Logo Hitowa 1
            </Button>
            <Button
              href='#'
              type='link'
              className='logo'
              style={{ color: '#FF6B35' }}
            >
              Logo Hitowa 2
            </Button>
            <Flex className='user-info'>
              <AppButton
                href='#'
                type='link'
                className='capitalize user-name'
                style={{ color: '#FF6B35' }}
              >
                Hitowa User
              </AppButton>
              <Avatar style={{ backgroundColor: '#FF6B35' }} />
            </Flex>
          </Row>
        </Flex>
      </div>
    </div>
  );
};

export default CustomHeader;
