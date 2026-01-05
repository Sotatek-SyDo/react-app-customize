import { resolveComponent } from '@/runtime/resolveComponent';
import { useClientConfig } from '@/runtime/ClientContext';

const WrapperButton = (props: any) => {
  const clientConfig = useClientConfig();
  const ButtonComponent = resolveComponent('AppButton', clientConfig);

  return <ButtonComponent {...props} />;
};

export default WrapperButton;
