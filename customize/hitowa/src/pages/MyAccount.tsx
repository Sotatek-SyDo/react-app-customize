import CustomButton from '../components/CustomButton';

export default function HitowaMyAccount() {
  return (
    <div
      style={{
        background: '#d4cca7',
      }}
    >
      <h1>My Account – Hitowa Custom</h1>
      <p>CLIENT = {import.meta.env.VITE_CLIENT ?? 'default'}</p>
      <CustomButton></CustomButton>
    </div>
  );
}
