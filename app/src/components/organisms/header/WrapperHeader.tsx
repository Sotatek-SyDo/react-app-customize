import { resolveComponent } from '@/runtime/resolveComponent';
import { useClientConfig } from '@/runtime/ClientContext';

const WrapperHeader = (props: any) => {
  const clientConfig = useClientConfig();
  const Header = resolveComponent('Header', clientConfig);

  return <Header {...props} />;
};

export default WrapperHeader;
