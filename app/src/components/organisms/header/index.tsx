import { Avatar, Flex, Row } from 'antd';

import WrapperButton from '@/components/atoms/AppButton/WrapperButton';
import './index.scss';

const Header = () => {
  return (
    <div id="header">
      <div className="container">
        <Flex justify="between" className="header-wrap">
          <Row className="nav">
            <WrapperButton href="#" type="link" className="logo">
              Logo Default
            </WrapperButton>
            <Flex className="user-info">
              <WrapperButton href="#" type="link" className="capitalize user-name">
                John
              </WrapperButton>
              <Avatar />
            </Flex>
          </Row>
        </Flex>
      </div>
    </div>
  );
};

export default Header;
