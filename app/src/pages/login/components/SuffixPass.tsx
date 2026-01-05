const SuffixPass = ({ isVisible }: { isVisible: boolean }) => {
  // return !isVisible ? <VisiblePass /> : <InvisiblePass />;
  return !isVisible ? <span>Visible</span> : <span>Invisible</span>;
};

export default SuffixPass;
